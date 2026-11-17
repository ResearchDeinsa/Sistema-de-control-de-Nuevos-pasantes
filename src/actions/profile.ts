"use server";

import { createClient } from "@/src/lib/supabase/server";
import {
  DEFAULT_USER_PROFILE,
  splitFullName,
  validateProfileUpdate,
  type UserProfile,
} from "@/src/services/profileService";

function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
}

export async function getCurrentUserProfile(): Promise<{
  authenticated: boolean;
  profile: UserProfile;
}> {
  if (!isSupabaseConfigured()) {
    return {
      authenticated: false,
      profile: DEFAULT_USER_PROFILE,
    };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return {
        authenticated: false,
        profile: DEFAULT_USER_PROFILE,
      };
    }

    const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
    const rawName =
      typeof meta.full_name === "string"
        ? meta.full_name
        : typeof meta.name === "string"
          ? meta.name
          : "";

    const split = splitFullName(rawName);
    const firstName =
      typeof meta.first_name === "string" && meta.first_name.trim()
        ? meta.first_name.trim()
        : split.firstName;
    const lastName =
      typeof meta.last_name === "string" && meta.last_name.trim()
        ? meta.last_name.trim()
        : split.lastName;

    return {
      authenticated: true,
      profile: {
        id: user.id,
        firstName,
        lastName,
        email: user.email ?? DEFAULT_USER_PROFILE.email,
        role:
          typeof meta.role === "string" && meta.role.trim()
            ? meta.role.trim()
            : DEFAULT_USER_PROFILE.role,
        department:
          typeof meta.department === "string" && meta.department.trim()
            ? meta.department.trim()
            : DEFAULT_USER_PROFILE.department,
        githubHandle:
          typeof meta.github_handle === "string" ? meta.github_handle.trim() : "",
        phone: typeof meta.phone === "string" ? meta.phone.trim() : "",
        bio:
          typeof meta.bio === "string" && meta.bio.trim()
            ? meta.bio.trim()
            : DEFAULT_USER_PROFILE.bio,
        updatedAt: user.updated_at ?? new Date().toISOString(),
      },
    };
  } catch {
    return {
      authenticated: false,
      profile: DEFAULT_USER_PROFILE,
    };
  }
}

export interface UpdateProfileInput {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  githubHandle: string;
  phone: string;
  bio: string;
}

export async function updateUserProfile(input: UpdateProfileInput): Promise<{
  success: boolean;
  message: string;
  errors?: Partial<Record<keyof UserProfile, string>>;
  profile?: UserProfile;
  syncedWithSupabase: boolean;
}> {
  const validation = validateProfileUpdate(input);
  if (!validation.valid) {
    return {
      success: false,
      message: "Revisa los campos del formulario antes de guardar.",
      errors: validation.errors,
      syncedWithSupabase: false,
    };
  }

  const normalizedProfile: Omit<UserProfile, "id"> = {
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    email: input.email.trim(),
    role: input.role.trim() || DEFAULT_USER_PROFILE.role,
    department: input.department.trim() || DEFAULT_USER_PROFILE.department,
    githubHandle: input.githubHandle.trim().replace(/^@/, ""),
    phone: input.phone.trim(),
    bio: input.bio.trim(),
    updatedAt: new Date().toISOString(),
  };

  if (!isSupabaseConfigured()) {
    return {
      success: true,
      message: "Datos de perfil actualizados correctamente.",
      profile: {
        id: DEFAULT_USER_PROFILE.id,
        ...normalizedProfile,
      },
      syncedWithSupabase: false,
    };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: true,
        message: "Datos de perfil guardados localmente en esta sesión.",
        profile: {
          id: DEFAULT_USER_PROFILE.id,
          ...normalizedProfile,
        },
        syncedWithSupabase: false,
      };
    }

    const fullName = `${normalizedProfile.firstName} ${normalizedProfile.lastName}`.trim();

    const { error: authError } = await supabase.auth.updateUser({
      data: {
        name: fullName,
        full_name: fullName,
        first_name: normalizedProfile.firstName,
        last_name: normalizedProfile.lastName,
        role: normalizedProfile.role,
        department: normalizedProfile.department,
        github_handle: normalizedProfile.githubHandle,
        phone: normalizedProfile.phone,
        bio: normalizedProfile.bio,
      },
    });

    if (authError) {
      return {
        success: false,
        message: authError.message || "No se pudo actualizar el perfil en Supabase.",
        syncedWithSupabase: false,
      };
    }

    // Sincronización opcional con tabla public.users si existe en el esquema de Supabase
    try {
      await supabase
        .from("users")
        .update({
          name: fullName,
          first_name: normalizedProfile.firstName,
          last_name: normalizedProfile.lastName,
          role: normalizedProfile.role,
        })
        .eq("id", user.id);
    } catch {
      // Si la tabla o columnas aún no están migradas, el perfil queda persistido en Auth metadata
    }

    return {
      success: true,
      message: "Perfil actualizado y sincronizado correctamente.",
      profile: {
        id: user.id,
        ...normalizedProfile,
        email: user.email ?? normalizedProfile.email,
      },
      syncedWithSupabase: true,
    };
  } catch {
    return {
      success: true,
      message: "Datos de perfil actualizados en la sesión actual.",
      profile: {
        id: DEFAULT_USER_PROFILE.id,
        ...normalizedProfile,
      },
      syncedWithSupabase: false,
    };
  }
}

export async function signOutUser(): Promise<{
  success: boolean;
  message: string;
}> {
  if (!isSupabaseConfigured()) {
    return {
      success: true,
      message: "Sesión cerrada correctamente.",
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        success: false,
        message: error.message || "No se pudo cerrar la sesión.",
      };
    }

    return {
      success: true,
      message: "Sesión cerrada correctamente.",
    };
  } catch {
    return {
      success: true,
      message: "Sesión cerrada correctamente.",
    };
  }
}
