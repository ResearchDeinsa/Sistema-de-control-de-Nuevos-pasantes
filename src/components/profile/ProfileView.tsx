"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOutUser, updateUserProfile } from "@/src/actions/profile";
import {
  getFullName,
  getInitials,
  type UserProfile,
} from "@/src/services/profileService";
import { useDashboard } from "@/src/components/dashboard/DashboardProvider";
import { MaterialIcon } from "@/src/components/dashboard/MaterialIcon";

export function ProfileView() {
  const { profile } = useDashboard();
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const formKey = `${profile.id}-${profile.updatedAt ?? "initial"}`;

  return (
    <ProfileViewInner
      key={formKey}
      initialProfile={profile}
      feedback={feedback}
      setFeedback={setFeedback}
    />
  );
}

function ProfileViewInner({
  initialProfile,
  feedback,
  setFeedback,
}: {
  initialProfile: UserProfile;
  feedback: { type: "success" | "error"; text: string } | null;
  setFeedback: React.Dispatch<
    React.SetStateAction<{ type: "success" | "error"; text: string } | null>
  >;
}) {
  const router = useRouter();
  const {
    completedCount,
    totalModules,
    allModulesCompleted,
    certificateId,
    updateProfileState,
    clearLocalSession,
  } = useDashboard();

  const [formState, setFormState] = useState({
    firstName: initialProfile.firstName,
    lastName: initialProfile.lastName,
    email: initialProfile.email,
    role: initialProfile.role,
    department: initialProfile.department,
    githubHandle: initialProfile.githubHandle,
    phone: initialProfile.phone,
    bio: initialProfile.bio,
  });

  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof UserProfile, string>>
  >({});

  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  const fullName = getFullName({
    firstName: formState.firstName,
    lastName: formState.lastName,
  });
  const initials = getInitials({
    firstName: formState.firstName,
    lastName: formState.lastName,
  });

  function handleFieldChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    if (feedback) setFeedback(null);
  }

  async function handleSaveProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);
    setFieldErrors({});

    try {
      const result = await updateUserProfile(formState);
      if (!result.success) {
        setFieldErrors(result.errors ?? {});
        setFeedback({ type: "error", text: result.message });
        return;
      }

      if (result.profile) {
        updateProfileState({
          ...result.profile,
          id: initialProfile.id,
        });
      }

      setFeedback({ type: "success", text: result.message });
    } catch {
      setFeedback({
        type: "error",
        text: "Ocurrió un error al actualizar tus datos. Intenta nuevamente.",
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleConfirmLogout() {
    setSigningOut(true);
    setLogoutError(null);
    try {
      const result = await signOutUser();
      if (!result.success) {
        setLogoutError(result.message);
        setSigningOut(false);
        return;
      }
      clearLocalSession();
      router.push("/login");
      router.refresh();
    } catch {
      setLogoutError("No fue posible cerrar la sesión en este momento.");
      setSigningOut(false);
    }
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Encabezado */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-neutral-100 pb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-600">
            Módulo 3.2 · Cuenta y preferencias
          </p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            Perfil de usuario
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            Administra tus datos personales para el programa de onboarding y tu certificado final.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50"
        >
          <MaterialIcon name="arrow_back" size={16} />
          Volver al centro de mando
        </Link>
      </header>

      {/* Tarjeta resumen de identidad */}
      <section className="rounded-3xl border border-neutral-200 bg-white p-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-xl font-extrabold text-white">
            {initials}
          </div>
          <div>
            <h2 className="text-xl font-bold text-neutral-900">{fullName}</h2>
            <p className="text-sm text-neutral-600">{formState.email}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white px-2.5 py-0.5 text-xs font-semibold text-neutral-700">
                <MaterialIcon name="badge" size={14} className="text-orange-500" />
                {formState.role || "Pasante"}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white px-2.5 py-0.5 text-xs font-semibold text-neutral-700">
                <MaterialIcon name="apartment" size={14} className="text-neutral-500" />
                {formState.department || "Research & Development"}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white px-5 py-4 text-left md:text-right">
          <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
            ID asignado para certificado
          </p>
          <p className="mt-1 font-mono text-sm font-bold text-neutral-900">
            {certificateId}
          </p>
          <p className="mt-1 text-xs font-medium text-neutral-500">
            {allModulesCompleted
              ? "Certificado emitido y desbloqueado"
              : `${completedCount} de ${totalModules} módulos completados`}
          </p>
        </div>
      </section>

      {/* Grid principal: 3.2.2 Actualización de datos + 3.2.1 Cierre de sesión */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* 3.2.2 Actualización de datos de usuario */}
        <section className="lg:col-span-2 rounded-3xl border border-neutral-200 bg-white p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 pb-5 border-b border-neutral-100">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-bold text-neutral-900">
                <MaterialIcon name="manage_accounts" size={22} className="text-orange-500" />
                Actualización de datos de usuario
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-neutral-500">
                El nombre y los apellidos ingresados aquí aparecerán automáticamente en tu Certificado Final.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="mt-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5"
                >
                  Nombres *
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formState.firstName}
                  onChange={handleFieldChange}
                  placeholder="Ej. Valentina"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
                {fieldErrors.firstName && (
                  <p className="mt-1 text-xs font-medium text-red-600">
                    {fieldErrors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5"
                >
                  Apellidos *
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formState.lastName}
                  onChange={handleFieldChange}
                  placeholder="Ej. Burbano Silva"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
                {fieldErrors.lastName && (
                  <p className="mt-1 text-xs font-medium text-red-600">
                    {fieldErrors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5"
                >
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleFieldChange}
                  placeholder="pasante@deinsaglobal.com"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-xs font-medium text-red-600">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5"
                >
                  Teléfono de contacto
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formState.phone}
                  onChange={handleFieldChange}
                  placeholder="Ej. +506 8888 8888"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="role"
                  className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5"
                >
                  Cargo / Rol
                </label>
                <input
                  id="role"
                  name="role"
                  type="text"
                  value={formState.role}
                  onChange={handleFieldChange}
                  placeholder="Pasante de Desarrollo"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div>
                <label
                  htmlFor="department"
                  className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5"
                >
                  Departamento / Área
                </label>
                <input
                  id="department"
                  name="department"
                  type="text"
                  value={formState.department}
                  onChange={handleFieldChange}
                  placeholder="Research & Development"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="githubHandle"
                className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5"
              >
                Usuario de GitHub
              </label>
              <input
                id="githubHandle"
                name="githubHandle"
                type="text"
                value={formState.githubHandle}
                onChange={handleFieldChange}
                placeholder="Ej. valentina-dev"
                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
              {fieldErrors.githubHandle && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {fieldErrors.githubHandle}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="bio"
                className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5"
              >
                Biografía breve
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                maxLength={320}
                value={formState.bio}
                onChange={handleFieldChange}
                placeholder="Describe brevemente tus objetivos dentro del programa de pasantía."
                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
              <div className="mt-1 flex items-center justify-between text-xs text-neutral-400">
                <span>{fieldErrors.bio ?? "Máximo 320 caracteres."}</span>
                <span>{formState.bio.length}/320</span>
              </div>
            </div>

            {feedback && (
              <div
                role="status"
                className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium ${
                  feedback.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                <MaterialIcon
                  name={feedback.type === "success" ? "check_circle" : "error"}
                  size={18}
                  filled
                />
                <span>{feedback.text}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setFormState({
                    firstName: initialProfile.firstName,
                    lastName: initialProfile.lastName,
                    email: initialProfile.email,
                    role: initialProfile.role,
                    department: initialProfile.department,
                    githubHandle: initialProfile.githubHandle,
                    phone: initialProfile.phone,
                    bio: initialProfile.bio,
                  });
                  setFieldErrors({});
                  setFeedback(null);
                }}
                className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                Descartar cambios
              </button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-50"
              >
                <MaterialIcon name="save" size={18} />
                {saving ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </form>
        </section>

        {/* 3.2.1 Cierre de Sesión */}
        <aside className="space-y-6">
          <section className="rounded-3xl border border-neutral-200 bg-white p-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600">
                <MaterialIcon name="logout" size={20} />
              </div>
              <div>
                <h2 className="text-base font-bold text-neutral-900">
                  Cierre de sesión
                </h2>
                <p className="text-xs text-neutral-500">
                  Sesión activa en este dispositivo
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              Al cerrar sesión se finalizará tu acceso actual en la plataforma de
              onboarding y serás redirigido a la pantalla de inicio de sesión.
            </p>

            {logoutError && (
              <p className="mt-3 text-xs font-semibold text-red-600">
                {logoutError}
              </p>
            )}

            {!confirmLogoutOpen ? (
              <button
                type="button"
                onClick={() => setConfirmLogoutOpen(true)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
              >
                <MaterialIcon name="logout" size={18} />
                Cerrar sesión
              </button>
            ) : (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50/50 p-4 space-y-3">
                <p className="text-xs font-semibold text-red-900">
                  ¿Confirmas que deseas cerrar tu sesión actual?
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleConfirmLogout}
                    disabled={signingOut}
                    className="flex-1 rounded-xl bg-red-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                  >
                    {signingOut ? "Cerrando..." : "Sí, cerrar sesión"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmLogoutOpen(false)}
                    disabled={signingOut}
                    className="flex-1 rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Acceso directo al certificado */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-200 bg-orange-50 text-orange-600">
                <MaterialIcon name="workspace_premium" size={20} filled />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">
                  Vista en Certificado
                </h3>
                <p className="text-xs text-neutral-500">
                  Datos que se imprimen al aprobar
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-neutral-200 bg-neutral-50/60 p-4 space-y-2 text-xs">
              <div>
                <span className="text-neutral-400 uppercase font-bold tracking-wider">
                  Nombre completo
                </span>
                <p className="font-bold text-neutral-900 text-sm mt-0.5">
                  {fullName}
                </p>
              </div>
              <div>
                <span className="text-neutral-400 uppercase font-bold tracking-wider">
                  ID Único
                </span>
                <p className="font-mono font-bold text-neutral-900 mt-0.5">
                  {certificateId}
                </p>
              </div>
            </div>

            <Link
              href="/dashboard/modulos#certificado-final"
              className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-800 hover:border-orange-300 hover:text-orange-700"
            >
              Ir a la sección de certificado
              <MaterialIcon name="arrow_forward" size={16} />
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
}
