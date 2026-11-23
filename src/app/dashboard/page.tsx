"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ONBOARDING_MODULES } from "@/src/services/onboardingModules";
import { getFullName } from "@/src/services/profileService";
import { useDashboard } from "@/src/components/dashboard/DashboardProvider";
import { MaterialIcon } from "@/src/components/dashboard/MaterialIcon";
import { ModuleCard } from "@/src/components/dashboard/ModuleCard";
import { ProgressRing } from "@/src/components/dashboard/ProgressRing";
import { ModuleBadge } from "@/src/components/dashboard/ModuleBadge";
import { MODULE_BADGES } from "@/src/services/moduleBadges";

export default function DashboardHomePage() {
  const {
    profile,
    progress,
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
      {/* Cabecera superior estilo Delphos Centro de Mando */}
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F05A28]">
            ETAPA 1 DE 3 · SEMANA DE INDUCCIÓN · MÓDULO {Math.min(completedCount + 1, totalModules)} DE {totalModules}
          </p>
          <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#121316]">
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
              placeholder="Buscar módulo o concepto..."
              aria-label="Buscar módulo o tecnología"
              className="w-full rounded-full border border-[#EAE5DB] bg-white py-2.5 pl-10 pr-4 text-sm text-[#121316] placeholder:text-neutral-400 outline-none transition-all focus:border-[#F05A28] focus:ring-2 focus:ring-[#F05A28]/20 shadow-2xs"
            />
          </div>

          <Link
            href="/dashboard/perfil"
            title="Ir a perfil de usuario"
            aria-label="Ir a perfil de usuario"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#EAE5DB] bg-white text-neutral-600 transition-colors hover:border-[#F05A28] hover:text-[#F05A28] shadow-2xs"
          >
            <MaterialIcon name="person" size={20} />
          </Link>
        </div>
      </header>

      {/* Sección Bento superior: Tarjeta Hero Oscura Delphos + Progreso total + Tarjeta Racha Naranja */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Tarjeta destacada oscura con resplandor (inspirada exactamente en Delphos screen 01) */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-3xl border border-white/10 bg-[#18191E] text-white p-6 sm:p-8 flex flex-col justify-between shadow-md">
          {/* Orbe luminoso cálido de fondo */}
          <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[#F05A28]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-blue-600/15 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#F05A28]">
                <MaterialIcon name="bolt" size={14} filled className="text-[#F05A28]" />
                {allModulesCompleted ? "Ruta completada" : "Misión de hoy"}
              </span>

              <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {allModulesCompleted
                  ? "Todos los módulos técnicos aprobados"
                  : `Domina ${activeModule.technology} en 25 minutos`}
              </h2>

              <p className="mt-2.5 text-sm leading-relaxed text-neutral-300">
                {allModulesCompleted
                  ? "Completaste las 8 tecnologías del programa. Descarga tu certificado final oficial con tu nombre, apellidos e ID único."
                  : activeModule.whatInternLearns}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-neutral-300">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-sm">
                  <MaterialIcon name="menu_book" size={14} className="text-[#F05A28]" />
                  {activeModule.lessons.length} lecciones
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-sm">
                  <MaterialIcon name="school" size={14} className="text-[#F05A28]" />
                  {activeModule.suggestedFormat}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-sm">
                  <MaterialIcon name="schedule" size={14} className="text-[#F05A28]" />
                  {activeModule.estimatedTime}
                </span>
              </div>
            </div>

            {/* Emblema visual del módulo activo */}
            <div className="relative z-10 hidden sm:flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border border-white/15 bg-white/[0.08] text-[#F05A28] shadow-inner backdrop-blur-md">
              <MaterialIcon
                name={allModulesCompleted ? "workspace_premium" : activeModule.icon}
                size={42}
                filled
              />
            </div>
          </div>

          <div className="relative z-10 mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={
                allModulesCompleted
                  ? "/dashboard/modulos#certificado-final"
                  : `/dashboard/modulos/${activeModule.slug}`
              }
              className="inline-flex items-center gap-2 rounded-2xl bg-[#F05A28] px-5 py-3 text-sm font-bold text-white shadow-md shadow-[#F05A28]/25 transition-all hover:bg-[#E04D1B] hover:shadow-lg"
            >
              {allModulesCompleted
                ? "Ver certificado final"
                : `Continuar misión`}
              <MaterialIcon name="arrow_forward" size={18} />
            </Link>

            <Link
              href="/dashboard/modulos"
              className="inline-flex items-center gap-1.5 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Ver programa completo
            </Link>

            {allModulesCompleted && (
              <Link
                href="/dashboard/proyectos"
                className="inline-flex items-center gap-1.5 rounded-2xl border border-blue-500/30 bg-blue-500/20 px-4 py-3 text-sm font-semibold text-blue-200 transition-colors hover:bg-blue-500/30"
              >
                <MaterialIcon name="view_kanban" size={18} />
                Tablero Trello (Proyectos)
              </Link>
            )}
          </div>
        </div>

        {/* Columna derecha: Progreso total blanco + Tarjeta Racha Naranja (como en Delphos screen 01) */}
        <div className="flex flex-col gap-5">
          {/* Progreso total (Card blanca limpia con borde crema) */}
          <div className="rounded-3xl border border-[#EAE5DB] bg-white p-5 flex items-center gap-5 shadow-sm">
            <ProgressRing percentage={overallProgressPercent} size={82} strokeWidth={8} />
            <div className="min-w-0">
              <h3 className="text-base font-bold text-[#121316]">
                Progreso total
              </h3>
              <p className="mt-0.5 text-xs text-[#6C707A]">
                {completedCount} de {totalModules} módulos aprobados
              </p>
              <span className="mt-2.5 inline-flex items-center gap-1 rounded-full border border-[#F05A28]/30 bg-[#F05A28]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#F05A28]">
                <MaterialIcon name="flag" size={13} filled />
                {allModulesCompleted ? "Certificado listo" : "Ruta activa"}
              </span>
            </div>
          </div>

          {/* Tarjeta de Racha / Desbloqueo en Terracota Naranja (#F05A28) */}
          <div className="flex-1 rounded-3xl bg-[#F05A28] text-white p-5 flex flex-col justify-between shadow-md shadow-[#F05A28]/25">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-white/80">
                  Racha de estudio activa
                </p>
                <p className="mt-1 text-xl font-extrabold text-white">
                  {completedCount >= 5 ? "5 días seguidos" : `${completedCount + 1} días activos`}
                </p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-white shadow-inner">
                <MaterialIcon name="bolt" size={20} filled />
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs text-white/90 font-medium mb-2.5">
                {allModulesCompleted
                  ? "8 de 8 módulos completados con éxito"
                  : `Módulo actual: ${activeModule.shortTitle}`}
              </p>
              <div className="grid grid-cols-8 gap-1.5">
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
                      className={`flex h-8 items-center justify-center rounded-xl text-xs font-bold transition-transform ${
                        st === "completed"
                          ? "bg-white text-[#F05A28] shadow-sm font-extrabold"
                          : st === "unlocked"
                            ? "bg-black/20 text-white ring-2 ring-white"
                            : "bg-white/15 text-white/50"
                      }`}
                    >
                      {st === "completed" ? (
                        <MaterialIcon name="check" size={14} />
                      ) : st === "locked" ? (
                        <MaterialIcon name="lock" size={12} />
                      ) : (
                        mod.order
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vitrina de Insignias Oficiales Deinsa R&D (Tarjeta Oscura como en Delphos screen 01) */}
      <section className="rounded-3xl border border-white/10 bg-[#18191E] text-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-white/10 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <MaterialIcon name="workspace_premium" size={20} className="text-[#F05A28]" filled />
              <h2 className="text-base sm:text-lg font-bold text-white">
                Tus Insignias Tecnológicas Oficiales
              </h2>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Al finalizar cada módulo con su video formativo y examen desbloqueas su insignia oficial.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#F05A28]/30 bg-[#F05A28]/20 px-3 py-1 text-xs font-bold text-[#F05A28]">
            {completedCount} de {totalModules} Insignias
          </span>
        </div>

        <div className="mt-5 grid grid-cols-4 sm:grid-cols-8 gap-3">
          {Object.entries(MODULE_BADGES).map(([modId, badge]) => {
            const isUnlocked = progress.completedModuleIds.includes(modId);
            return (
              <Link
                key={modId}
                href={`/dashboard/modulos/${badge.slug}`}
                className={`group flex flex-col items-center justify-between rounded-2xl border p-2.5 text-center transition-all ${
                  isUnlocked
                    ? "border-emerald-500/30 bg-emerald-500/10 hover:border-emerald-500/50"
                    : "border-white/10 bg-white/5 hover:border-[#F05A28]/60"
                }`}
              >
                <ModuleBadge moduleId={modId} isUnlocked={isUnlocked} size="sm" />
                <span className="mt-1.5 text-[10px] font-bold text-neutral-200 line-clamp-1 group-hover:text-[#F05A28] transition-colors">
                  {badge.technology}
                </span>
                <span
                  className={`text-[9px] font-semibold ${
                    isUnlocked ? "text-emerald-400" : "text-neutral-500"
                  }`}
                >
                  {isUnlocked ? "Acreditada" : "Bloqueada"}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Sección principal: Tus módulos (los 8 módulos de enseñanza progresivos en tarjetas blancas limpias) */}
      <section className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-[#121316]">
              Tus módulos
            </h2>
            <p className="text-sm text-[#6C707A]">
              Cada módulo enseña una tecnología clave y permanece bloqueado hasta aprobar el anterior.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/dashboard/universos"
              className="inline-flex items-center gap-1.5 rounded-2xl border border-purple-200 bg-purple-50 px-3.5 py-2 text-xs font-bold text-purple-800 hover:bg-purple-100 transition-colors shadow-2xs"
            >
              <MaterialIcon name="travel_explore" size={16} />
              Ecosistema de Universos (Pistas)
            </Link>
            <Link
              href="/dashboard/modulos"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#F05A28] hover:text-[#E04D1B]"
            >
              Abrir catálogo completo
              <MaterialIcon name="arrow_forward" size={16} />
            </Link>
          </div>
        </div>

        {filteredModules.length === 0 ? (
          <div className="rounded-3xl border border-[#EAE5DB] bg-white p-10 text-center shadow-sm">
            <MaterialIcon name="search_off" size={32} className="text-neutral-400" />
            <p className="mt-2 text-sm font-semibold text-[#121316]">
              No se encontraron módulos para &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-3 text-xs font-bold text-[#F05A28] hover:underline cursor-pointer"
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

      {/* Fila inferior: Ruta de aprendizaje + Certificado final */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Ruta de aprendizaje */}
        <div className="lg:col-span-2 rounded-3xl border border-[#EAE5DB] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[#121316]">
                Ruta de aprendizaje progresiva
              </h2>
              <p className="text-xs text-[#6C707A]">
                Secuencia obligatoria de tecnologías del Leadership Acceleration Program
              </p>
            </div>
            <span className="text-xs font-semibold text-[#6C707A]">
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
                        ? "border-[#F05A28]/40 bg-[#F05A28]/5"
                        : "border-[#EAE5DB] bg-white opacity-70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full ${
                        st === "completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : st === "unlocked"
                            ? "bg-[#F05A28] text-white"
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
                    <p className="text-xs font-bold text-[#121316] leading-tight">
                      {mod.shortTitle}
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#6C707A] truncate">
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

        {/* Tarjeta resumen de Certificado Final */}
        <div className="rounded-3xl border border-[#EAE5DB] bg-white p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#F05A28]/30 bg-[#F05A28]/10 px-2.5 py-1 text-[11px] font-bold text-[#F05A28]">
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

            <h3 className="mt-3 text-lg font-bold text-[#121316]">
              Acreditación Deinsa Global
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#6C707A]">
              Al aprobar los {totalModules} módulos se emite tu certificado oficial
              con logo institucional, tu nombre y apellidos, y un ID único verificable.
            </p>

            <div className="mt-4 rounded-2xl border border-[#EAE5DB] bg-[#FAF7F2] p-3.5 space-y-1.5 text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[#6C707A]">Titular:</span>
                <span className="font-bold text-[#121316] truncate">
                  {fullName}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[#6C707A]">ID Único:</span>
                <span className="font-mono font-bold text-[#121316]">
                  {certificateId}
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/dashboard/modulos#certificado-final"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#121316] bg-white px-4 py-2.5 text-xs font-bold text-[#121316] transition-colors hover:bg-[#121316] hover:text-white"
          >
            {allModulesCompleted ? "Descargar certificado" : "Ver estado del certificado"}
            <MaterialIcon name="arrow_forward" size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
