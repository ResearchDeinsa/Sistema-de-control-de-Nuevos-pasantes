import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
  updateProfile as updateFirebaseProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./config";
import type { UserProfile } from "@/src/services/profileService";

export const SECRET_LEADER_ACCOUNT = {
  email: "ingenieros2026@gmail.com",
  password: "admin12345",
  profile: {
    id: "usr_admin_ingenieros2026",
    firstName: "Equipo Ingenieros",
    lastName: "R&D Deinsa",
    email: "ingenieros2026@gmail.com",
    role: "Líder de Ingeniería / Supervisor R&D",
    department: "Research & Development",
    githubHandle: "deinsaglobal-lead",
    phone: "+506 2200 0000",
    bio: "Supervisión técnica de proyectos en creación (CRM, Plataforma de Pasantes) y evaluación de progreso R&D.",
  } as UserProfile,
};

export async function loginWithFirebase(
  email: string,
  pass: string
): Promise<{
  success: boolean;
  message: string;
  isSecretLeader?: boolean;
  user?: { uid: string; email: string | null; displayName: string | null };
}> {
  const cleanEmail = email.trim().toLowerCase();

  // Validación de cuenta secreta de líder R&D
  if (
    cleanEmail === SECRET_LEADER_ACCOUNT.email.toLowerCase() &&
    pass === SECRET_LEADER_ACCOUNT.password
  ) {
    if (typeof window !== "undefined") {
      localStorage.setItem("deinsa_lap_current_user_id", SECRET_LEADER_ACCOUNT.profile.id);
      localStorage.setItem(
        `deinsa_lap_${SECRET_LEADER_ACCOUNT.profile.id}_profile_v1`,
        JSON.stringify(SECRET_LEADER_ACCOUNT.profile)
      );

      const allModuleIds = [
        "mod-1-github",
        "mod-2-react-nextjs",
        "mod-3-nodejs-express",
        "mod-4-supabase-firebase",
        "mod-5-notion",
        "mod-6-make",
        "mod-7-n8n",
        "mod-8-ia-gemini",
      ];
      localStorage.setItem(
        `deinsa_lap_${SECRET_LEADER_ACCOUNT.profile.id}_progress_v1`,
        JSON.stringify({
          completedModuleIds: allModuleIds,
          completedLessonIds: {
            "mod-1-github": ["gh-l1", "gh-l2", "gh-l3"],
            "mod-2-react-nextjs": ["rn-l1", "rn-l2", "rn-l3"],
            "mod-3-nodejs-express": ["ne-l1", "ne-l2", "ne-l3"],
            "mod-4-supabase-firebase": ["sf-l1", "sf-l2", "sf-l3"],
            "mod-5-notion": ["nt-l1", "nt-l2"],
            "mod-6-make": ["mk-l1", "mk-l2"],
            "mod-7-n8n": ["n8n-l1", "n8n-l2"],
            "mod-8-ia-gemini": ["ai-l1", "ai-l2"],
          },
          quizPassedIds: allModuleIds,
          watchedVideoIds: allModuleIds,
          evidenceByModule: allModuleIds.reduce((acc, id) => {
            acc[id] = {
              urlOrNote: "Acreditado oficialmente por Supervisión de Ingeniería R&D Deinsa Global.",
              checklistDone: [true, true, true],
              submittedAt: new Date().toISOString(),
            };
            return acc;
          }, {} as Record<string, { urlOrNote: string; checklistDone: boolean[]; submittedAt: string }>),
          completedAllAt: new Date().toISOString(),
          streakDays: 8,
        })
      );
    }

    return {
      success: true,
      isSecretLeader: true,
      message: "Acceso concedido como Líder de Ingeniería R&D.",
      user: {
        uid: SECRET_LEADER_ACCOUNT.profile.id,
        email: SECRET_LEADER_ACCOUNT.email,
        displayName: `${SECRET_LEADER_ACCOUNT.profile.firstName} ${SECRET_LEADER_ACCOUNT.profile.lastName}`,
      },
    };
  }

  // Autenticación estándar con Firebase Auth
  try {
    const cred = await signInWithEmailAndPassword(auth, cleanEmail, pass);
    if (typeof window !== "undefined") {
      localStorage.setItem("deinsa_lap_current_user_id", cred.user.uid);
    }
    return {
      success: true,
      message: "Inicio de sesión exitoso",
      user: {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName,
      },
    };
  } catch (err: unknown) {
    const error = err as { code?: string; message?: string };
    let msg = "Credenciales incorrectas o usuario no registrado.";

    if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
      msg = "Correo o contraseña incorrectos.";
    } else if (error.code === "auth/user-not-found") {
      msg = "No existe una cuenta registrada con este correo.";
    } else if (error.code === "auth/too-many-requests") {
      msg = "Demasiados intentos fallidos. Intenta más tarde.";
    } else if (error.code === "auth/network-request-failed") {
      msg = "Error de conexión de red con Firebase.";
    }

    return {
      success: false,
      message: msg,
    };
  }
}

export async function loginWithGoogle(): Promise<{
  success: boolean;
  message: string;
  user?: { uid: string; email: string | null; displayName: string | null };
}> {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const cred = await signInWithPopup(auth, provider);

    if (typeof window !== "undefined") {
      localStorage.setItem("deinsa_lap_current_user_id", cred.user.uid);
      const displayName = cred.user.displayName || "";
      const nameParts = displayName.trim().split(" ");
      const firstName = nameParts[0] || "Pasante";
      const lastName = nameParts.slice(1).join(" ") || "Deinsa";

      const existingKey = `deinsa_lap_${cred.user.uid}_profile_v1`;
      const existing = localStorage.getItem(existingKey);
      if (!existing) {
        const newProfile: UserProfile = {
          id: cred.user.uid,
          firstName,
          lastName,
          email: cred.user.email || "",
          role: "Pasante Técnico",
          department: "Research & Development",
          githubHandle: "",
          phone: "",
          bio: "Pasante del Leadership Acceleration Program en Deinsa Global.",
        };
        localStorage.setItem(existingKey, JSON.stringify(newProfile));
      }
    }

    return {
      success: true,
      message: "Inicio de sesión exitoso con Google.",
      user: {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName,
      },
    };
  } catch (err: unknown) {
    const error = err as { code?: string; message?: string };
    let msg = "No fue posible iniciar sesión con Google.";
    if (error.code === "auth/popup-closed-by-user") {
      msg = "Ventana de autenticación cerrada antes de completar.";
    } else if (error.code === "auth/cancelled-popup-request") {
      msg = "Operación cancelada.";
    } else if (error.code === "auth/popup-blocked") {
      msg = "El navegador bloqueó la ventana emergente de Google. Permite ventanas emergentes para este sitio.";
    } else if (error.code === "auth/operation-not-allowed") {
      msg = "El proveedor de Google aún no está habilitado en la consola de Firebase Authentication.";
    }
    return {
      success: false,
      message: msg,
    };
  }
}

export async function registerWithFirebase(
  name: string,
  email: string,
  pass: string
): Promise<{
  success: boolean;
  message: string;
  user?: { uid: string; email: string | null };
}> {
  try {
    const cleanEmail = email.trim().toLowerCase();
    const cred = await createUserWithEmailAndPassword(auth, cleanEmail, pass);

    if (name.trim() && cred.user) {
      await updateFirebaseProfile(cred.user, { displayName: name.trim() });
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("deinsa_lap_current_user_id", cred.user.uid);
      const nameParts = name.trim().split(" ");
      const firstName = nameParts[0] || "Pasante";
      const lastName = nameParts.slice(1).join(" ") || "Deinsa";

      const newProfile: UserProfile = {
        id: cred.user.uid,
        firstName,
        lastName,
        email: cleanEmail,
        role: "Pasante Técnico",
        department: "Research & Development",
        githubHandle: "",
        phone: "",
        bio: "Pasante del Leadership Acceleration Program en Deinsa Global.",
      };

      localStorage.setItem(
        `deinsa_lap_${cred.user.uid}_profile_v1`,
        JSON.stringify(newProfile)
      );
    }

    return {
      success: true,
      message: "Registro exitoso en Firebase.",
      user: {
        uid: cred.user.uid,
        email: cred.user.email,
      },
    };
  } catch (err: unknown) {
    const error = err as { code?: string; message?: string };
    let msg = "No fue posible completar el registro.";
    if (error.code === "auth/email-already-in-use") {
      msg = "El correo ya está registrado. Inicia sesión en su lugar.";
    } else if (error.code === "auth/weak-password") {
      msg = "La contraseña debe tener al menos 6 caracteres.";
    } else if (error.code === "auth/invalid-email") {
      msg = "El formato del correo es inválido.";
    }
    return {
      success: false,
      message: msg,
    };
  }
}

export async function resetPasswordWithFirebase(
  email: string
): Promise<{ success: boolean; message: string }> {
  try {
    const cleanEmail = email.trim().toLowerCase();
    await sendPasswordResetEmail(auth, cleanEmail);
    return {
      success: true,
      message: "Correo de restablecimiento enviado a través de Firebase.",
    };
  } catch (err: unknown) {
    const error = err as { code?: string };
    let msg = "No fue posible enviar el correo de recuperación.";
    if (error.code === "auth/user-not-found") {
      msg = "No existe una cuenta con ese correo.";
    }
    return {
      success: false,
      message: msg,
    };
  }
}

export async function signOutFirebase(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch {
    // Si no estaba autenticado en Firebase, no bloquear
  }
}
