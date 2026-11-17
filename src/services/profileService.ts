export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  githubHandle: string;
  phone: string;
  bio: string;
  updatedAt?: string;
}

export interface ProfileValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof UserProfile, string>>;
}

export const DEFAULT_USER_PROFILE: UserProfile = {
  id: "lap-intern-001",
  firstName: "Valentina",
  lastName: "Burbano",
  email: "pasante@deinsaglobal.com",
  role: "Pasante de Desarrollo",
  department: "Research & Development",
  githubHandle: "",
  phone: "",
  bio: "Participante del Leadership Acceleration Program en Deinsa Global.",
};

export function getFullName(profile: Pick<UserProfile, "firstName" | "lastName">): string {
  const full = `${profile.firstName.trim()} ${profile.lastName.trim()}`.trim();
  return full || "Pasante Deinsa Global";
}

export function getInitials(profile: Pick<UserProfile, "firstName" | "lastName">): string {
  const first = profile.firstName.trim().charAt(0).toUpperCase();
  const last = profile.lastName.trim().charAt(0).toUpperCase();
  return `${first}${last}`.trim() || "DG";
}

export function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const cleaned = fullName.trim().replace(/\s+/g, " ");
  if (!cleaned) {
    return { firstName: DEFAULT_USER_PROFILE.firstName, lastName: DEFAULT_USER_PROFILE.lastName };
  }
  const parts = cleaned.split(" ");
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "" };
  }
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

export function validateProfileUpdate(input: Partial<UserProfile>): ProfileValidationResult {
  const errors: Partial<Record<keyof UserProfile, string>> = {};

  if (!input.firstName || input.firstName.trim().length < 2) {
    errors.firstName = "Ingresa tu nombre (mínimo 2 caracteres).";
  }

  if (!input.lastName || input.lastName.trim().length < 2) {
    errors.lastName = "Ingresa tus apellidos (mínimo 2 caracteres).";
  }

  if (input.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
    errors.email = "Ingresa un correo electrónico válido.";
  }

  if (input.githubHandle && input.githubHandle.trim().length > 0) {
    const cleanHandle = input.githubHandle.trim().replace(/^@/, "");
    if (!/^[a-zA-Z0-9-]+$/.test(cleanHandle)) {
      errors.githubHandle = "Usa únicamente tu usuario de GitHub (letras, números o guiones).";
    }
  }

  if (input.bio && input.bio.trim().length > 320) {
    errors.bio = "La biografía no puede superar los 320 caracteres.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Generates a deterministic, unique certification ID based on user identity and full name.
 * Format: DG-LAP-YYYY-XXXXXX
 */
export function generateUniqueCertificateId(
  userId: string,
  fullName: string,
  completedAtIso?: string
): string {
  const year = completedAtIso ? new Date(completedAtIso).getFullYear() : new Date().getFullYear();
  const seed = `${userId.toLowerCase()}|${fullName.toLowerCase()}|DEINSA-LAP-CERT`;

  let hashA = 0x811c9dc5;
  let hashB = 0x9e3779b9;
  for (let i = 0; i < seed.length; i += 1) {
    const code = seed.charCodeAt(i);
    hashA ^= code;
    hashA = Math.imul(hashA, 0x01000193);
    hashB = Math.imul(hashB ^ code, 0x85ebca6b);
  }

  const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  const combined = ((hashA >>> 0).toString(16).padStart(8, "0") + (hashB >>> 0).toString(16).padStart(8, "0"));
  let code = "";
  for (let i = 0; i < 6; i += 1) {
    const chunk = parseInt(combined.slice(i * 2, i * 2 + 2), 16);
    code += alphabet[chunk % alphabet.length];
  }

  return `DG-LAP-${year}-${code}`;
}
