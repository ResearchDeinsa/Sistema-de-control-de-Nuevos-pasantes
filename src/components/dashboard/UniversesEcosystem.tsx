"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { UNIVERSES_DATA, type UniverseNode } from "@/src/services/universeData";
import { useDashboard } from "./DashboardProvider";
import { MaterialIcon } from "./MaterialIcon";
import { ModuleBadge } from "./ModuleBadge";

export function UniversesEcosystem() {
  const { progress, getModuleStatus } = useDashboard();
  const [selectedUniverse, setSelectedUniverse] = useState<UniverseNode>(
    UNIVERSES_DATA[0]
  );
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Efecto de paralaje con el ratón / mouse
  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePos({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const filteredUniverses = UNIVERSES_DATA.filter((u) => {
    if (activeCategory === "ALL") return true;
    if (activeCategory === "FRONTEND") return u.category === "Core" || u.category === "Frontend";
    if (activeCategory === "BACKEND") return u.category === "Backend" || u.category === "Cloud";
    if (activeCategory === "AUTOMATION_AI") return u.category === "Productividad" || u.category === "Automatización" || u.category === "IA";
    return true;
  });

  const selectedStatus = getModuleStatus(selectedUniverse.moduleId);

  return (
    <div className="space-y-6 pb-12">
      {/* Cabecera del Ecosistema estilo Delphos */}
      <header className="rounded-3xl border border-[#EAE5DB] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F05A28] text-white shadow-sm">
                <MaterialIcon name="travel_explore" size={20} filled />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#F05A28]">
                Ecosistema Interactivo R&amp;D
              </span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#121316]">
              Universos de Conocimiento Técnico
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#6C707A] max-w-2xl">
              Explora los 8 universos tecnológicos con movimiento reactivo al ratón. Pasa el cursor sobre cada planeta para descubrir notas clave, comandos y pistas infalibles para las evaluaciones de cada módulo.
            </p>
          </div>

          {/* Filtros por Categoría */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "ALL", label: "Todos los Universos" },
              { id: "FRONTEND", label: "Git & Frontend" },
              { id: "BACKEND", label: "Backend & Datos" },
              { id: "AUTOMATION_AI", label: "Automatización & IA" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#121316] text-white shadow-sm"
                    : "border border-[#EAE5DB] bg-white text-neutral-600 hover:bg-[#FAF7F2]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Canvas Espacial Interactivo con Ratón */}
      <div
        ref={containerRef}
        className="relative min-h-[580px] sm:min-h-[640px] w-full overflow-hidden rounded-3xl border border-neutral-800 bg-gradient-to-b from-[#0D0F14] via-[#111319] to-[#18191E] shadow-2xl select-none"
        style={{
          perspective: "1200px",
        }}
      >
        {/* Capa de Estrellas Lejanas con Paralaje */}
        <div
          className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out opacity-80"
          style={{
            transform: `translate3d(${mousePos.x * -15}px, ${mousePos.y * -15}px, 0)`,
          }}
        >
          <div className="absolute top-[10%] left-[15%] h-1 w-1 rounded-full bg-white animate-ping opacity-70" />
          <div className="absolute top-[25%] left-[60%] h-1.5 w-1.5 rounded-full bg-orange-300 shadow-[0_0_8px_#f97316]" />
          <div className="absolute top-[40%] left-[30%] h-1 w-1 rounded-full bg-blue-300" />
          <div className="absolute top-[70%] left-[80%] h-1.5 w-1.5 rounded-full bg-purple-300 shadow-[0_0_8px_#a855f7]" />
          <div className="absolute top-[85%] left-[20%] h-1 w-1 rounded-full bg-emerald-300" />
          <div className="absolute top-[55%] left-[48%] h-1 w-1 rounded-full bg-amber-200 animate-pulse" />
          <div className="absolute top-[15%] left-[85%] h-1 w-1 rounded-full bg-white opacity-60" />
          <div className="absolute top-[80%] left-[55%] h-1 w-1 rounded-full bg-teal-300" />
        </div>

        {/* Resplandor cósmico dinámico centrado en la posición del ratón */}
        <div
          className="pointer-events-none absolute -inset-[100px] transition-transform duration-500 ease-out opacity-40 blur-3xl"
          style={{
            background: `radial-gradient(circle at ${50 + mousePos.x * 25}% ${
              50 + mousePos.y * 25
            }%, rgba(240, 90, 40, 0.3), rgba(59, 130, 246, 0.15), transparent 70%)`,
          }}
        />

        {/* Órbitas Elípticas Guía */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="h-[320px] w-[320px] rounded-full border border-dashed border-white/60" />
          <div className="absolute h-[520px] w-[520px] rounded-full border border-dashed border-white/40" />
          <div className="absolute h-[700px] w-[700px] rounded-full border border-dashed border-white/30" />
        </div>

        {/* Los 8 Planetas / Universos Interactivos */}
        <div
          className="absolute inset-0 transition-transform duration-200 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 20}px, 0) rotateX(${
              mousePos.y * -4
            }deg) rotateY(${mousePos.x * 4}deg)`,
          }}
        >
          {filteredUniverses.map((univ) => {
            const isSelected = selectedUniverse.id === univ.id;
            const isCompleted = progress.completedModuleIds.includes(univ.moduleId);

            return (
              <div
                key={univ.id}
                onClick={() => setSelectedUniverse(univ)}
                className="group absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-110 hover:z-30"
                style={{
                  left: `${univ.x}%`,
                  top: `${univ.y}%`,
                }}
              >
                {/* Anillo de órbita individual alrededor del planeta */}
                <div
                  className={`absolute -inset-4 rounded-full border transition-all duration-300 ${
                    isSelected
                      ? "border-[#F05A28] opacity-90 scale-110 animate-spin"
                      : "border-white/20 opacity-40 group-hover:opacity-75 group-hover:border-white/60"
                  }`}
                  style={{ animationDuration: "12s" }}
                >
                  <div
                    className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
                    style={{ backgroundColor: univ.color }}
                  />
                </div>

                {/* Esfera Planetaria con Gradiente y Glow */}
                <div
                  className={`relative flex items-center justify-center rounded-full bg-gradient-to-br ${
                    univ.gradient
                  } shadow-lg transition-all duration-300 ${
                    isSelected
                      ? "ring-4 ring-[#F05A28] ring-offset-4 ring-offset-neutral-950 scale-110"
                      : "group-hover:ring-2 group-hover:ring-white/50"
                  }`}
                  style={{
                    width: `${univ.size}px`,
                    height: `${univ.size}px`,
                    boxShadow: isSelected
                      ? `0 0 35px ${univ.glow}, inset 0 0 15px rgba(255,255,255,0.4)`
                      : `0 0 20px ${univ.glow}`,
                  }}
                >
                  {/* Logo de la tecnología en el centro */}
                  <div className="flex items-center justify-center p-2 text-white drop-shadow">
                    <ModuleBadge
                      moduleId={univ.moduleId}
                      isUnlocked={true}
                      size="sm"
                    />
                  </div>

                  {/* Indicador de módulo aprobado */}
                  {isCompleted && (
                    <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-neutral-950 text-[10px] font-bold">
                      <MaterialIcon name="check" size={12} className="text-white" />
                    </div>
                  )}
                </div>

                {/* Etiqueta flotante holográfica debajo del planeta */}
                <div className="mt-2 text-center pointer-events-none">
                  <span
                    className={`inline-block rounded-md px-2 py-0.5 text-[11px] font-extrabold tracking-wide backdrop-blur-md transition-colors ${
                      isSelected
                        ? "bg-[#F05A28] text-white shadow-md"
                        : "bg-neutral-900/80 text-neutral-200 border border-neutral-700/80 group-hover:border-[#F05A28] group-hover:text-white"
                    }`}
                  >
                    {univ.technology}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* HUD Inferior en Tiempo Real: Coordenadas y Orientación */}
        <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-neutral-400 pointer-events-none">
          <div className="flex items-center gap-2 rounded-xl bg-neutral-900/80 border border-neutral-800 px-3 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>UNIVERSO SELECCIONADO: <strong className="text-white">{selectedUniverse.codename}</strong></span>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-neutral-900/80 border border-neutral-800 px-3 py-1.5 backdrop-blur-md">
            <span>ROTACIÓN RATÓN: X: {(mousePos.x * 10).toFixed(1)}° · Y: {(mousePos.y * 10).toFixed(1)}°</span>
          </div>
        </div>
      </div>

      {/* Panel Holográfico de Inspección Estelar (Tarjeta Oscura Delphos Screen 02) */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#18191E] text-white p-6 sm:p-8 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pb-6 border-b border-white/10">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-inner">
              <ModuleBadge
                moduleId={selectedUniverse.moduleId}
                isUnlocked={selectedStatus === "completed"}
                size="md"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-neutral-300">
                  {selectedUniverse.codename}
                </span>
                <span className="rounded-full border border-[#F05A28]/30 bg-[#F05A28]/15 px-2.5 py-0.5 text-xs font-semibold text-[#F05A28]">
                  Categoría: {selectedUniverse.category}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    selectedStatus === "completed"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-white/10 text-neutral-300"
                  }`}
                >
                  {selectedStatus === "completed" ? "Insignia Obtenida" : "Módulo Disponible"}
                </span>
              </div>

              <h2 className="mt-2 text-2xl font-extrabold text-white">
                {selectedUniverse.technology}
              </h2>
              <p className="mt-0.5 text-xs sm:text-sm font-medium text-neutral-300">
                {selectedUniverse.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/dashboard/modulos/${selectedUniverse.slug}`}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#F05A28] px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition-all hover:bg-[#E04D1B] shadow-md shadow-[#F05A28]/25"
            >
              <MaterialIcon name="rocket_launch" size={18} />
              Despegar a estudiar este módulo
            </Link>
          </div>
        </div>

        {/* Grid de 3 Columnas: Notas Clave | Pistas de Evaluación | Consejo Senior R&D */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Columna 1: Notas de Oro del Módulo */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm border-b border-white/10 pb-2">
              <MaterialIcon name="menu_book" size={18} className="text-[#F05A28]" />
              <span>Notas Esenciales del Módulo</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
              {selectedUniverse.coreNotes.map((note, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <MaterialIcon
                    name="arrow_right"
                    size={16}
                    className="text-[#F05A28] shrink-0 mt-0.5"
                  />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 2: Pistas Clave para la Prueba / Quiz (Cheat Sheet) */}
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm border-b border-amber-500/20 pb-2">
              <MaterialIcon name="lightbulb" size={18} className="text-amber-400" filled />
              <span>Pistas para la Evaluación (Quiz 3/3)</span>
            </div>
            <p className="text-xs text-amber-200">
              Usa estas pistas de oro para resolver el cuestionario final sin equivocarte:
            </p>
            <div className="space-y-2.5">
              {selectedUniverse.quizHints.map((hint, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-amber-500/20 bg-black/30 p-3 text-xs"
                >
                  <p className="font-bold text-white mb-0.5">{hint.questionRef}</p>
                  <p className="text-amber-300 font-medium">{hint.hint}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Columna 3: Consejo Senior R&D y Comando Secreto */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 space-y-4 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-sm border-b border-white/10 pb-2">
              <MaterialIcon name="military_tech" size={18} className="text-purple-400" />
              <span>Consejo Senior R&amp;D Deinsa</span>
            </div>

            <div className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed text-neutral-200 bg-white/[0.05] p-3.5 rounded-xl border border-white/10">
              <MaterialIcon name="lightbulb" size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <span>{selectedUniverse.proTip}</span>
            </div>

            {selectedUniverse.secretCommand && (
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5 block">
                  Comando o snippet rápido recomendado:
                </span>
                <pre className="overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-3 font-mono text-xs text-emerald-400">
                  <code>{selectedUniverse.secretCommand}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
