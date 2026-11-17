"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ONBOARDING_MODULES } from "@/src/services/onboardingModules";
import { getFullName } from "@/src/services/profileService";
import { useDashboard } from "@/src/components/dashboard/DashboardProvider";
import { MaterialIcon } from "@/src/components/dashboard/MaterialIcon";
import { ModuleCard } from "@/src/components/dashboard/ModuleCard";
import { ProgressRing } from "@/src/components/dashboard/ProgressRing";

export default function DashboardHomePage() {
  const {
    profile,
    completedCount,
    totalModules,
    overallProgressPercent,
    allModulesCompleted,
    activeModule,
    certificateId,
    getModuleStatus,
    getModuleProgressPercent,
  } = useDashboard();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredModules = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return ONBOARDING_MODULES;
    return ONBOARDING_MODULES.filter(
      (mod) =>
        mod.technology.toLowerCase().includes(q) ||
        mod.whatInternLearns.toLowerCase().includes(q) ||
        mod.suggestedFormat.toLowerCase().includes(q) ||
        mod.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const fullName = getFullName(profile);

  return (
    <div className="space-y-8 pb-10">
      {/* Cabecera superior (estructura inspirada en referencia, totalmente en blanco) */}
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-600">
            Módulo {Math.min(completedCount + 1, totalModules)} de {totalModules} · Programa de Capacitación Técnica
          </p>
          <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            Hola, {profile.firstName || "Pasante"}.
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-72">
            <MaterialIcon
              name="search"
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar módulo o tecnología..."
              aria-label="Buscar módulo o tecnología"
              className="w-full rounded-full border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <Link
            href="/dashboard/perfil"
            title="Ir a perfil de usuario"
            aria-label="Ir a perfil de usuario"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors hover:border-orange-300 hover:text-orange-600"
          >
            <MaterialIcon name="person" size={20} />
          </Link>
        </div>
      </header>

      {/* Sección Bento superior: Misión actual + Progreso total + Avance por pasos */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Tarjeta destacada del módulo activo (en blanco limpio con acento Deinsa) */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-orange-700">
                <MaterialIcon name="bolt" size={14} filled />
                {allModulesCompleted ? "Ruta completada" : "Misión activa"}
              </span>

              <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
                {allModulesCompleted
                  ? "Todos los módulos técnicos aprobados"
                  : `Domina ${activeModule.technology}`}
              </h2>

              <p className="mt-2.5 text-sm leading-relaxed text-neutral-600">
                {allModulesCompleted
                  ? "Completaste las 8 tecnologías del programa. Descarga tu certificado final oficial con tu nombre, apellidos e ID único."
                  : activeModule.whatInternLearns}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-neutral-600">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1">
                  <MaterialIcon name="menu_book" size={14} className="text-orange-500" />
                  {activeModule.lessons.length} lecciones
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1">
                  <MaterialIcon name="school" size={14} className="text-orange-500" />
                  {activeModule.suggestedFormat}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1">
                  <MaterialIcon name="schedule" size={14} className="text-orange-500" />
                  {activeModule.estimatedTime}
                </span>
              </div>
            </div>

            {/* Emblema visual limpio del módulo activo */}
            <div className="hidden sm:flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border border-orange-200/80 bg-orange-50/60 text-orange-600">
              <MaterialIcon
                name={allModulesCompleted ? "workspace_premium" : activeModule.icon}
                size={42}
                filled
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={
                allModulesCompleted
                  ? "/dashboard/modulos#certificado-final"
                  : `/dashboard/modulos/${activeModule.slug}`
              }
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
            >
              {allModulesCompleted
                ? "Ver certificado final"
                : `Continuar módulo ${activeModule.order}`}
              <MaterialIcon name="arrow_forward" size={18} />
            </Link>

            <Link
              href="/dashboard/modulos"
              className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
            >
              Ver programa completo
            </Link>
          </div>
        </div>

        {/* Columna derecha apilada: Progreso total + Control de desbloqueo */}
        <div className="flex flex-col gap-5">
          {/* Progreso total */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-5 flex items-center gap-5">
            <ProgressRing percentage={overallProgressPercent} size={82} strokeWidth={8} />
            <div className="min-w-0">
              <h3 className="text-base font-bold text-neutral-900">
                Progreso total
              </h3>
              <p className="mt-0.5 text-xs text-neutral-500">
                {completedCount} de {totalModules} módulos aprobados
              </p>
              <span className="mt-2.5 inline-flex items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 text-[11px] font-semibold text-orange-700">
                <MaterialIcon name="flag" size={13} filled />
                {allModulesCompleted ? "Certificado listo" : "Avance progresivo"}
              </span>
            </div>
          </div>

          {/* Tarjeta de estado de desbloqueo progresivo (en blanco con acento naranja) */}
          <div className="flex-1 rounded-3xl border border-orange-200 bg-white p-5 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-orange-600">
                  Módulos secuenciales
                </p>
                <p className="mt-1 text-lg font-extrabold text-neutral-900">
                  {allModulesCompleted
                    ? "8 de 8 desbloqueados"
                    : `${completedCount + 1} de ${totalModules} habilitados`}
                </p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <MaterialIcon name="lock_open" size={20} filled />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-8 gap-1.5">
              {ONBOARDING_MODULES.map((mod) => {
                const st = getModuleStatus(mod.id);
                return (
                  <div
                    key={mod.id}
                    title={`Módulo ${mod.order}: ${mod.shortTitle} (${
                      st === "completed"
                        ? "Completado"
                        : st === "unlocked"
                          ? "Disponible"
                          : "Bloqueado"
                    })`}
                    className={`flex h-8 items-center justify-center rounded-lg border text-xs font-bold ${
                      st === "completed"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : st === "unlocked"
                          ? "border-orange-500 bg-orange-500 text-white"
                          : "border-neutral-200 bg-neutral-50 text-neutral-400"
                    }`}
                  >
                    {st === "completed" ? (
                      <MaterialIcon name="check" size={14} />
                    ) : st === "locked" ? (
                      <MaterialIcon name="lock" size={13} />
                    ) : (
                      mod.order
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Sección principal: Tus módulos (los 8 módulos de enseñanza progresivos) */}
      <section className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-neutral-900">
              Tus módulos
            </h2>
            <p className="text-sm text-neutral-500">
              Cada módulo enseña una tecnología clave y permanece bloqueado hasta aprobar el anterior.
            </p>
          </div>
          <Link
            href="/dashboard/modulos"
            className="inline-flex items-center gap-1 text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            Abrir sección de módulos y certificado
            <MaterialIcon name="arrow_forward" size={16} />
          </Link>
        </div>

        {filteredModules.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center">
            <MaterialIcon name="search_off" size={32} className="text-neutral-400" />
            <p className="mt-2 text-sm font-semibold text-neutral-800">
              No se encontraron módulos para &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-3 text-xs font-semibold text-orange-600 hover:underline"
            >
              Limpiar búsqueda
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {filteredModules.map((mod) => {
              const prevMod =
                mod.order > 1 ? ONBOARDING_MODULES[mod.order - 2] : undefined;
              return (
                <ModuleCard
                  key={mod.id}
                  module={mod}
                  status={getModuleStatus(mod.id)}
                  progressPercent={getModuleProgressPercent(mod)}
                  previousModuleName={prevMod?.shortTitle}
                />
              );
            })}
          </div>
        )}
      </section>

      {/* Fila inferior (inspirada en referencia: Ruta de aprendizaje + Certificado final) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Ruta de aprendizaje */}
        <div className="lg:col-span-2 rounded-3xl border border-neutral-200 bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-neutral-900">
                Ruta de aprendizaje progresiva
              </h2>
              <p className="text-xs text-neutral-500">
                Secuencia obligatoria de tecnologías del Leadership Acceleration Program
              </p>
            </div>
            <span className="text-xs font-semibold text-neutral-500">
              {completedCount}/{totalModules} aprobados
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ONBOARDING_MODULES.map((mod) => {
              const st = getModuleStatus(mod.id);
              const isLocked = st === "locked";
              const tile = (
                <div
                  className={`rounded-2xl border p-3.5 transition-all h-full flex flex-col justify-between ${
                    st === "completed"
                      ? "border-emerald-200 bg-white"
                      : st === "unlocked"
                        ? "border-orange-300 bg-orange-50/40"
                        : "border-neutral-200 bg-white opacity-70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full ${
                        st === "completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : st === "unlocked"
                            ? "bg-orange-500 text-white"
                            : "bg-neutral-100 text-neutral-400"
                      }`}
                    >
                      <MaterialIcon
                        name={
                          st === "completed"
                            ? "check"
                            : st === "unlocked"
                              ? "play_arrow"
                              : "lock"
                        }
                        size={15}
                        filled={st !== "locked"}
                      />
                    </span>
                    <span className="text-[11px] font-bold text-neutral-400">
                      0{mod.order}
                    </span>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs font-bold text-neutral-900 leading-tight">
                      {mod.shortTitle}
                    </p>
                    <p className="mt-0.5 text-[11px] text-neutral-500 truncate">
                      {mod.category}
                    </p>
                  </div>
                </div>
              );

              if (isLocked) {
                return <div key={mod.id}>{tile}</div>;
              }
              return (
                <Link key={mod.id} href={`/dashboard/modulos/${mod.slug}`}>
                  {tile}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Tarjeta resumen de Certificado Final (totalmente en blanco) */}
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-[11px] font-bold text-orange-700">
                <MaterialIcon name="workspace_premium" size={14} filled />
                Certificado Final
              </span>
              <MaterialIcon
                name={allModulesCompleted ? "verified" : "lock"}
                size={20}
                filled={allModulesCompleted}
                className={allModulesCompleted ? "text-emerald-600" : "text-neutral-400"}
              />
            </div>

            <h3 className="mt-3 text-lg font-bold text-neutral-900">
              Acreditación Deinsa Global
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-neutral-600">
              Al aprobar los {totalModules} módulos se emite tu certificado oficial
              con logo institucional, tu nombre y apellidos, y un ID único verificable.
            </p>

            <div className="mt-4 rounded-2xl border border-neutral-200 bg-neutral-50/70 p-3.5 space-y-1.5 text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-neutral-500">Titular:</span>
                <span className="font-bold text-neutral-900 truncate">
                  {fullName}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-neutral-500">ID Único:</span>
                <span className="font-mono font-bold text-neutral-900">
                  {certificateId}
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/dashboard/modulos#certificado-final"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-900 bg-white px-4 py-2.5 text-xs font-bold text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
          >
            {allModulesCompleted ? "Descargar certificado" : "Ver estado del certificado"}
            <MaterialIcon name="arrow_forward" size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
