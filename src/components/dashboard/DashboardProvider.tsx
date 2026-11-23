"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  ONBOARDING_MODULES,
  type OnboardingModule,
} from "@/src/services/onboardingModules";
import {
  generateUniqueCertificateId,
  getFullName,
  type UserProfile,
} from "@/src/services/profileService";

export type ModuleStatus = "completed" | "unlocked" | "locked";

export interface ModuleEvidence {
  urlOrNote: string;
  checklistDone: boolean[];
  submittedAt: string;
}

export interface OnboardingProgressState {
  completedModuleIds: string[];
  completedLessonIds: Record<string, string[]>;
  quizPassedIds: string[];
  watchedVideoIds: string[];
  evidenceByModule: Record<string, ModuleEvidence>;
  completedAllAt: string | null;
  streakDays: number;
}

const DEFAULT_PROGRESS: OnboardingProgressState = {
  completedModuleIds: [],
  completedLessonIds: {},
  quizPassedIds: [],
  watchedVideoIds: [],
  evidenceByModule: {},
  completedAllAt: null,
  streakDays: 1,
};

const listeners = new Set<() => void>();

function emitStorageChange() {
  listeners.forEach((listener) => listener());
}

function subscribeStorage(callback: () => void) {
  listeners.add(callback);
  const onStorage = () => callback();
  if (typeof window !== "undefined") {
    window.addEventListener("storage", onStorage);
  }
  return () => {
    listeners.delete(callback);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", onStorage);
    }
  };
}

function getStorageKey(userId: string, suffix: string): string {
  return `deinsa_lap_${userId}_${suffix}`;
}

function readRawStorage(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeRawStorage(key: string, value: string | null) {
  if (typeof window === "undefined") return;
  try {
    if (value === null) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, value);
    }
    emitStorageChange();
  } catch {
    // Ignorar errores de cuota de almacenamiento
  }
}

function parseProgress(raw: string | null): OnboardingProgressState {
  if (!raw) return DEFAULT_PROGRESS;
  try {
    const parsed = JSON.parse(raw) as Partial<OnboardingProgressState>;
    return {
      completedModuleIds: Array.isArray(parsed.completedModuleIds)
        ? parsed.completedModuleIds
        : [],
      completedLessonIds:
        parsed.completedLessonIds && typeof parsed.completedLessonIds === "object"
          ? parsed.completedLessonIds
          : {},
      quizPassedIds: Array.isArray(parsed.quizPassedIds)
        ? parsed.quizPassedIds
        : [],
      watchedVideoIds: Array.isArray(parsed.watchedVideoIds)
        ? parsed.watchedVideoIds
        : [],
      evidenceByModule:
        parsed.evidenceByModule && typeof parsed.evidenceByModule === "object"
          ? parsed.evidenceByModule
          : {},
      completedAllAt:
        typeof parsed.completedAllAt === "string" ? parsed.completedAllAt : null,
      streakDays:
        typeof parsed.streakDays === "number" && parsed.streakDays > 0
          ? parsed.streakDays
          : 1,
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

interface DashboardContextValue {
  profile: UserProfile;
  authenticated: boolean;
  progress: OnboardingProgressState;
  completedCount: number;
  totalModules: number;
  overallProgressPercent: number;
  allModulesCompleted: boolean;
  activeModule: OnboardingModule;
  certificateId: string;
  getModuleStatus: (moduleId: string) => ModuleStatus;
  getModuleProgressPercent: (mod: OnboardingModule) => number;
  toggleLessonComplete: (moduleId: string, lessonId: string) => void;
  toggleVideoWatched: (moduleId: string) => void;
  markQuizPassed: (moduleId: string) => void;
  completeModule: (
    moduleId: string,
    evidence: { urlOrNote: string; checklistDone: boolean[] }
  ) => void;
  updateProfileState: (nextProfile: UserProfile) => void;
  clearLocalSession: () => void;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

interface DashboardProviderProps {
  initialProfile: UserProfile;
  authenticated: boolean;
  children: React.ReactNode;
}

export function DashboardProvider({
  initialProfile,
  authenticated,
  children,
}: DashboardProviderProps) {
  const activeUserId =
    (typeof window !== "undefined" &&
      window.localStorage.getItem("deinsa_lap_current_user_id")) ||
    initialProfile.id;

  const progressKey = getStorageKey(activeUserId, "progress_v1");
  const profileKey = getStorageKey(activeUserId, "profile_v1");

  const rawProgress = useSyncExternalStore(
    subscribeStorage,
    () => readRawStorage(progressKey),
    () => null
  );

  const rawProfile = useSyncExternalStore(
    subscribeStorage,
    () => readRawStorage(profileKey),
    () => null
  );

  const progress = useMemo(() => parseProgress(rawProgress), [rawProgress]);

  const profile = useMemo<UserProfile>(() => {
    if (!rawProfile) return initialProfile;
    try {
      const parsed = JSON.parse(rawProfile) as Partial<UserProfile>;
      return {
        ...initialProfile,
        ...parsed,
        id: initialProfile.id,
      };
    } catch {
      return initialProfile;
    }
  }, [initialProfile, rawProfile]);

  const persistProgress = useCallback(
    (next: OnboardingProgressState) => {
      writeRawStorage(progressKey, JSON.stringify(next));
    },
    [progressKey]
  );

  const getModuleStatus = useCallback(
    (moduleId: string): ModuleStatus => {
      if (progress.completedModuleIds.includes(moduleId)) {
        return "completed";
      }
      const modIndex = ONBOARDING_MODULES.findIndex((m) => m.id === moduleId);
      if (modIndex <= 0) {
        return "unlocked";
      }
      const prevModule = ONBOARDING_MODULES[modIndex - 1];
      if (progress.completedModuleIds.includes(prevModule.id)) {
        return "unlocked";
      }
      return "locked";
    },
    [progress.completedModuleIds]
  );

  const getModuleProgressPercent = useCallback(
    (mod: OnboardingModule): number => {
      const status = getModuleStatus(mod.id);
      if (status === "completed") return 100;
      if (status === "locked") return 0;

      const doneLessons = progress.completedLessonIds[mod.id]?.length ?? 0;
      const totalLessons = Math.max(1, mod.lessons.length);
      const lessonsScore = (doneLessons / totalLessons) * 40;
      const quizScore = progress.quizPassedIds.includes(mod.id) ? 35 : 0;
      const isVideoWatched = (progress.watchedVideoIds ?? []).includes(mod.id);
      const videoScore = isVideoWatched ? 25 : 0;

      return Math.min(99, Math.round(lessonsScore + quizScore + videoScore));
    },
    [
      getModuleStatus,
      progress.completedLessonIds,
      progress.quizPassedIds,
      progress.watchedVideoIds,
    ]
  );

  const toggleVideoWatched = useCallback(
    (moduleId: string) => {
      const currentProgress = parseProgress(readRawStorage(progressKey));
      const current = currentProgress.watchedVideoIds ?? [];
      const exists = current.includes(moduleId);
      const updated = exists
        ? current.filter((id) => id !== moduleId)
        : [...current, moduleId];
      persistProgress({
        ...currentProgress,
        watchedVideoIds: updated,
      });
    },
    [persistProgress, progressKey]
  );

  const toggleLessonComplete = useCallback(
    (moduleId: string, lessonId: string) => {
      const currentProgress = parseProgress(readRawStorage(progressKey));
      const current = currentProgress.completedLessonIds[moduleId] ?? [];
      const exists = current.includes(lessonId);
      const updated = exists
        ? current.filter((id) => id !== lessonId)
        : [...current, lessonId];
      persistProgress({
        ...currentProgress,
        completedLessonIds: {
          ...currentProgress.completedLessonIds,
          [moduleId]: updated,
        },
      });
    },
    [persistProgress, progressKey]
  );

  const markQuizPassed = useCallback(
    (moduleId: string) => {
      const currentProgress = parseProgress(readRawStorage(progressKey));
      if (currentProgress.quizPassedIds.includes(moduleId)) return;
      persistProgress({
        ...currentProgress,
        quizPassedIds: [...currentProgress.quizPassedIds, moduleId],
      });
    },
    [persistProgress, progressKey]
  );

  const completeModule = useCallback(
    (
      moduleId: string,
      evidence: { urlOrNote: string; checklistDone: boolean[] }
    ) => {
      const currentProgress = parseProgress(readRawStorage(progressKey));
      const mod = ONBOARDING_MODULES.find((m) => m.id === moduleId);
      const allLessonIds = mod ? mod.lessons.map((l) => l.id) : [];
      const nextCompleted = Array.from(
        new Set([...currentProgress.completedModuleIds, moduleId])
      );
      const allDone = nextCompleted.length === ONBOARDING_MODULES.length;

      persistProgress({
        ...currentProgress,
        completedModuleIds: nextCompleted,
        completedLessonIds: {
          ...currentProgress.completedLessonIds,
          [moduleId]: allLessonIds,
        },
        quizPassedIds: currentProgress.quizPassedIds.includes(moduleId)
          ? currentProgress.quizPassedIds
          : [...currentProgress.quizPassedIds, moduleId],
        evidenceByModule: {
          ...currentProgress.evidenceByModule,
          [moduleId]: {
            urlOrNote: evidence.urlOrNote.trim(),
            checklistDone: evidence.checklistDone,
            submittedAt: new Date().toISOString(),
          },
        },
        completedAllAt: allDone
          ? currentProgress.completedAllAt ?? new Date().toISOString()
          : currentProgress.completedAllAt,
        streakDays: Math.min(
          7,
          Math.max(currentProgress.streakDays, nextCompleted.length)
        ),
      });
    },
    [persistProgress, progressKey]
  );

  const updateProfileState = useCallback(
    (nextProfile: UserProfile) => {
      writeRawStorage(profileKey, JSON.stringify(nextProfile));
    },
    [profileKey]
  );

  const clearLocalSession = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("deinsa_lap_current_user_id");
    }
    writeRawStorage(profileKey, null);
  }, [profileKey]);

  const totalModules = ONBOARDING_MODULES.length;
  const completedCount = progress.completedModuleIds.length;
  const allModulesCompleted = completedCount === totalModules;

  const overallProgressPercent = useMemo(() => {
    const sum = ONBOARDING_MODULES.reduce(
      (acc, mod) => acc + getModuleProgressPercent(mod),
      0
    );
    return Math.round(sum / totalModules);
  }, [getModuleProgressPercent, totalModules]);

  const activeModule = useMemo(() => {
    const firstUnlocked = ONBOARDING_MODULES.find(
      (mod) => getModuleStatus(mod.id) === "unlocked"
    );
    return firstUnlocked ?? ONBOARDING_MODULES[ONBOARDING_MODULES.length - 1];
  }, [getModuleStatus]);

  const certificateId = useMemo(() => {
    return generateUniqueCertificateId(
      profile.id,
      getFullName(profile),
      progress.completedAllAt ?? undefined
    );
  }, [profile, progress.completedAllAt]);

  const value = useMemo<DashboardContextValue>(
    () => ({
      profile,
      authenticated,
      progress,
      completedCount,
      totalModules,
      overallProgressPercent,
      allModulesCompleted,
      activeModule,
      certificateId,
      getModuleStatus,
      getModuleProgressPercent,
      toggleLessonComplete,
      toggleVideoWatched,
      markQuizPassed,
      completeModule,
      updateProfileState,
      clearLocalSession,
    }),
    [
      activeModule,
      allModulesCompleted,
      authenticated,
      certificateId,
      clearLocalSession,
      completeModule,
      completedCount,
      getModuleProgressPercent,
      getModuleStatus,
      markQuizPassed,
      overallProgressPercent,
      profile,
      progress,
      toggleLessonComplete,
      toggleVideoWatched,
      totalModules,
      updateProfileState,
    ]
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboard debe usarse dentro de DashboardProvider");
  }
  return ctx;
}
