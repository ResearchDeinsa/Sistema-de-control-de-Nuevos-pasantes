"use client";

import React from "react";
import Link from "next/link";
import type { OnboardingModule } from "@/src/services/onboardingModules";
import type { ModuleStatus } from "./DashboardProvider";
import { MaterialIcon } from "./MaterialIcon";

interface ModuleCardProps {
  module: OnboardingModule;
  status: ModuleStatus;
  progressPercent: number;
  previousModuleName?: string;
}

export function ModuleCard({
  module,
  status,
  progressPercent,
  previousModuleName,
}: ModuleCardProps) {
  const isLocked = status === "locked";
  const isCompleted = status === "completed";

  const statusConfig = {
    completed: {
      label: "Completado",
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      barColor: "#10B981",
      iconName: "check_circle",
    },
    unlocked: {
      label: progressPercent > 0 ? `${progressPercent}%` : "Disponible",
      badgeClass: "bg-orange-50 text-orange-700 border-orange-200",
      barColor: "#F47F27",
      iconName: "play_circle",
    },
    locked: {
      label: "Bloqueado",
      badgeClass: "bg-neutral-50 text-neutral-500 border-neutral-200",
      barColor: "#E5E7EB",
      iconName: "lock",
    },
  }[status];

  const cardInner = (
    <div
      className={`group relative flex h-full flex-col justify-between rounded-2xl border bg-white p-5 transition-all duration-200 ${
        isLocked
          ? "border-neutral-200/80 opacity-80 cursor-not-allowed"
          : "border-neutral-200 hover:border-orange-300 hover:shadow-[0_12px_30px_-16px_rgba(244,127,39,0.35)]"
      }`}
    >
      <div>
        {/* Fila 1: Icono de tecnología a la izquierda + Badge de estado a la derecha */}
        <div className="flex items-center justify-between gap-2">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors"
            style={{
              backgroundColor: isLocked ? "#F8FAFC" : `${module.accentColor}12`,
              borderColor: isLocked ? "#E5E7EB" : `${module.accentColor}28`,
              color: isLocked ? "#9CA3AF" : module.accentColor,
            }}
          >
            <MaterialIcon
              name={isLocked ? "lock" : module.icon}
              size={20}
              filled={!isLocked}
            />
          </div>

          <span
            className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap ${statusConfig.badgeClass}`}
          >
            <MaterialIcon
              name={statusConfig.iconName}
              size={13}
              filled={isCompleted}
            />
            {statusConfig.label}
          </span>
        </div>

        {/* Fila 2: Número de módulo y título a ancho completo (sin apilar palabras) */}
        <div className="mt-4">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400">
            Módulo {String(module.order).padStart(2, "0")}
          </span>
          <h3 className="mt-0.5 text-[15px] font-bold text-neutral-900 leading-snug">
            {module.technology}
          </h3>
        </div>

        {/* Qué debe aprender el pasante */}
        <p className="mt-2 text-xs leading-relaxed text-neutral-600 line-clamp-2">
          {module.whatInternLearns}
        </p>

        {/* Formato sugerido */}
        <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-neutral-500">
          <MaterialIcon name="school" size={14} className="text-neutral-400" />
          <span className="truncate">{module.suggestedFormat}</span>
        </div>
      </div>

      {/* Pie de tarjeta: barra de progreso + acción o requisito de desbloqueo */}
      <div className="mt-4 pt-3.5 border-t border-neutral-100">
        <div className="flex items-center justify-between gap-2 text-[11px] mb-2">
          <span className="font-medium text-neutral-500 truncate">
            {isLocked
              ? previousModuleName
                ? `Requiere ${previousModuleName}`
                : "Completa el módulo anterior"
              : isCompleted
                ? "Módulo aprobado"
                : `${module.lessons.length} lecciones · ${module.estimatedTime}`}
          </span>
          {!isLocked && (
            <span className="inline-flex shrink-0 items-center gap-1 font-bold text-orange-600 group-hover:translate-x-0.5 transition-transform">
              {isCompleted ? "Repasar" : "Estudiar"}
              <MaterialIcon name="arrow_forward" size={13} />
            </span>
          )}
        </div>

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${
                isLocked
                  ? 0
                  : Math.max(progressPercent, status === "unlocked" ? 8 : 0)
              }%`,
              backgroundColor: statusConfig.barColor,
            }}
          />
        </div>
      </div>
    </div>
  );

  if (isLocked) {
    return (
      <div
        aria-disabled="true"
        title={
          previousModuleName
            ? `Bloqueado: completa primero el módulo ${previousModuleName}`
            : "Módulo bloqueado"
        }
        className="h-full"
      >
        {cardInner}
      </div>
    );
  }

  return (
    <Link href={`/dashboard/modulos/${module.slug}`} className="block h-full">
      {cardInner}
    </Link>
  );
}
