"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ONBOARDING_MODULES } from "@/src/services/onboardingModules";
import {
  useDashboard,
  type ModuleStatus,
} from "@/src/components/dashboard/DashboardProvider";
import { CertificateCard } from "@/src/components/dashboard/CertificateCard";
import { MaterialIcon } from "@/src/components/dashboard/MaterialIcon";
import { ModuleCard } from "@/src/components/dashboard/ModuleCard";

type StatusFilter = "all" | ModuleStatus;

export default function ModulesPage() {
  const {
    profile,
    progress,
    completedCount,
    totalModules,
    allModulesCompleted,
    activeModule,
    certificateId,
    getModuleStatus,
    getModuleProgressPercent,
  } = useDashboard();

  const [filter, setFilter] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");

  const filteredModules = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ONBOARDING_MODULES.filter((mod) => {
      const st = getModuleStatus(mod.id);
      if (filter !== "all" && st !== filter) return false;
      if (!q) return true;
      return (
        mod.technology.toLowerCase().includes(q) ||
        mod.whatInternLearns.toLowerCase().includes(q) ||
        mod.suggestedFormat.toLowerCase().includes(q)
      );
    });
  }, [filter, getModuleStatus, query]);

  const filterButtons: { id: StatusFilter; label: string }[] = [
    { id: "all", label: `Todos (${totalModules})` },
    { id: "unlocked", label: "Disponible" },
    { id: "completed", label: `Completados (${completedCount})` },
    {
      id: "locked",
      label: `Bloqueados (${Math.max(0, totalModules - completedCount - (allModulesCompleted ? 0 : 1))})`,
    },
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Cabecera */}
      <header className="no-print flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between border-b border-neutral-100 pb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-600">
            Ruta formativa progresiva · 8 tecnologías clave
          </p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            Módulos de enseñanza
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm text-neutral-600">
            Cada módulo incluye lecciones guiadas, evaluación rápida y reto práctico.
            Los módulos permanecen bloqueados hasta aprobar el anterior.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {!allModulesCompleted && (
            <Link
              href={`/dashboard/modulos/${activeModule.slug}`}
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Continuar: {activeModule.shortTitle}
              <MaterialIcon name="arrow_forward" size={16} />
            </Link>
          )}
          <a
            href="#certificado-final"
            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-700 hover:border-orange-300 hover:text-orange-700"
          >
            <MaterialIcon name="workspace_premium" size={16} className="text-orange-500" />
            Ir al certificado final
          </a>
        </div>
      </header>

      {/* Filtros y búsqueda */}
      <section className="no-print flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => setFilter(btn.id)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                filter === btn.id
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <MaterialIcon
            name="search"
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filtrar por tecnología..."
            aria-label="Filtrar por tecnología"
            className="w-full rounded-full border border-neutral-200 bg-white py-2 pl-10 pr-4 text-xs text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
        </div>
      </section>

      {/* Grid de los 8 módulos */}
      <section className="no-print">
        {filteredModules.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center">
            <MaterialIcon name="filter_list_off" size={30} className="text-neutral-400" />
            <p className="mt-2 text-sm font-semibold text-neutral-800">
              No hay módulos que coincidan con este filtro.
            </p>
            <button
              type="button"
              onClick={() => {
                setFilter("all");
                setQuery("");
              }}
              className="mt-3 text-xs font-semibold text-orange-600 hover:underline"
            >
              Mostrar todos los módulos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
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

      {/* Tabla resumen curricular del programa */}
      <section className="no-print rounded-3xl border border-neutral-200 bg-white overflow-hidden">
        <div className="border-b border-neutral-100 px-6 py-4">
          <h2 className="text-base font-bold text-neutral-900">
            Plan curricular y criterios de avance
          </h2>
          <p className="text-xs text-neutral-500">
            Resumen oficial de tecnologías, aprendizaje esperado y formato sugerido.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-neutral-200 bg-neutral-50/70 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="px-6 py-3.5">Tecnología</th>
                <th className="px-6 py-3.5">Qué debe aprender el pasante</th>
                <th className="px-6 py-3.5">Formato sugerido</th>
                <th className="px-6 py-3.5 text-right">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {ONBOARDING_MODULES.map((mod) => {
                const st = getModuleStatus(mod.id);
                return (
                  <tr key={mod.id} className="bg-white hover:bg-neutral-50/50">
                    <td className="px-6 py-4 font-bold text-neutral-900 whitespace-nowrap">
                      <span className="inline-flex items-center gap-2">
                        <span className="text-xs font-mono text-neutral-400">
                          0{mod.order}
                        </span>
                        {mod.technology}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-neutral-600">
                      {mod.whatInternLearns}
                    </td>
                    <td className="px-6 py-4 text-neutral-600">
                      {mod.suggestedFormat}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      {st === "locked" ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-semibold text-neutral-500">
                          <MaterialIcon name="lock" size={14} />
                          Bloqueado
                        </span>
                      ) : (
                        <Link
                          href={`/dashboard/modulos/${mod.slug}`}
                          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${
                            st === "completed"
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                              : "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100"
                          }`}
                        >
                          <MaterialIcon
                            name={st === "completed" ? "check_circle" : "play_circle"}
                            size={14}
                            filled={st === "completed"}
                          />
                          {st === "completed" ? "Completado" : "Disponible"}
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Certificado Final dentro de la sección de Módulos */}
      <CertificateCard
        profile={profile}
        certificateId={certificateId}
        completedCount={completedCount}
        totalModules={totalModules}
        allModulesCompleted={allModulesCompleted}
        completedAllAt={progress.completedAllAt}
      />
    </div>
  );
}
