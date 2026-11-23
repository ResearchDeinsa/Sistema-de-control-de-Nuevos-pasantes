"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  getNextModule,
  ONBOARDING_MODULES,
  type OnboardingModule,
} from "@/src/services/onboardingModules";
import { getBadgeForModule } from "@/src/services/moduleBadges";
import { useDashboard } from "./DashboardProvider";
import { MaterialIcon } from "./MaterialIcon";
import { ModuleBadge } from "./ModuleBadge";

interface ModuleDetailViewProps {
  module: OnboardingModule;
}

export function ModuleDetailView({ module }: ModuleDetailViewProps) {
  const {
    progress,
    activeModule,
    getModuleStatus,
    getModuleProgressPercent,
    toggleLessonComplete,
    toggleVideoWatched,
    markQuizPassed,
    completeModule,
  } = useDashboard();

  const status = getModuleStatus(module.id);
  const progressPercent = getModuleProgressPercent(module);
  const nextModule = getNextModule(module.slug);
  const prevModule =
    module.order > 1 ? ONBOARDING_MODULES[module.order - 2] : undefined;

  const badgeData = getBadgeForModule(module.id);

  const completedLessons = progress.completedLessonIds[module.id] ?? [];
  const allLessonsDone = module.lessons.every((lesson) =>
    completedLessons.includes(lesson.id)
  );

  const quizAlreadyPassed =
    progress.quizPassedIds.includes(module.id) || status === "completed";

  const isVideoWatched =
    (progress.watchedVideoIds ?? []).includes(module.id) ||
    status === "completed";

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>(
    {}
  );
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  const quizScore = useMemo(() => {
    return module.quiz.reduce((acc, q) => {
      return acc + (selectedAnswers[q.id] === q.correctIndex ? 1 : 0);
    }, 0);
  }, [module.quiz, selectedAnswers]);

  // Requisitos simplificados según instrucción del usuario:
  // 1. Mirar completo el video.
  // 2. Mirar todos los materiales / lecciones del Paso 1.
  // 3. Responder las preguntas finales (Paso 2) aprobadas (100% correctas).
  const canUnlockNext = allLessonsDone && quizAlreadyPassed && isVideoWatched;

  function handleValidateQuiz() {
    setQuizSubmitted(true);
    if (quizScore === module.quiz.length) {
      markQuizPassed(module.id);
    }
  }

  function handleCompleteModule(e: React.FormEvent) {
    e.preventDefault();
    if (!canUnlockNext) return;
    completeModule(module.id, {
      urlOrNote: `Aprobado con Masterclass en video e Insignia Oficial de ${module.technology}`,
      checklistDone: [true, true, true],
    });
    setJustCompleted(true);
  }

  // Guardia de módulo bloqueado (gating progresivo)
  if (status === "locked") {
    return (
      <div className="mx-auto max-w-3xl py-8">
        <Link
          href="/dashboard/modulos"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 hover:text-neutral-900"
        >
          <MaterialIcon name="arrow_back" size={18} />
          Volver a los módulos
        </Link>

        <div className="mt-6 rounded-3xl border border-neutral-200 bg-white p-8 md:p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 text-neutral-500">
            <MaterialIcon name="lock" size={32} filled />
          </div>
          <span className="mt-4 inline-block rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-600">
            Módulo {String(module.order).padStart(2, "0")} · Bloqueado
          </span>
          <h1 className="mt-3 text-2xl font-extrabold text-neutral-900">
            {module.technology}
          </h1>
          <p className="mt-2 mx-auto max-w-lg text-sm leading-relaxed text-neutral-600">
            Este módulo se desbloqueará automáticamente cuando completes{" "}
            <strong className="text-neutral-900">
              {prevModule ? prevModule.technology : "el módulo anterior"}
            </strong>
            . El programa sigue un avance progresivo para asegurar el dominio de
            cada tecnología.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/dashboard/modulos/${activeModule.slug}`}
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Continuar con {activeModule.shortTitle}
              <MaterialIcon name="arrow_forward" size={18} />
            </Link>
            <Link
              href="/dashboard/modulos"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
            >
              Ver mapa de módulos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Navegación superior */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/dashboard/modulos"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 transition-colors hover:text-neutral-900"
        >
          <MaterialIcon name="arrow_back" size={18} />
          Volver al catálogo de módulos
        </Link>

        <div className="flex items-center gap-2">
          {prevModule && (
            <Link
              href={`/dashboard/modulos/${prevModule.slug}`}
              className="inline-flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-600 hover:bg-neutral-50"
            >
              <MaterialIcon name="arrow_back" size={14} />
              {prevModule.shortTitle}
            </Link>
          )}
          {nextModule && getModuleStatus(nextModule.id) !== "locked" && (
            <Link
              href={`/dashboard/modulos/${nextModule.slug}`}
              className="inline-flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-600 hover:bg-neutral-50"
            >
              {nextModule.shortTitle}
              <MaterialIcon name="arrow_forward" size={14} />
            </Link>
          )}
        </div>
      </div>

      {/* Banner de Insignia Obtenida */}
      {(status === "completed" || justCompleted) && badgeData && (
        <div className="relative overflow-hidden rounded-3xl border-2 border-emerald-400 bg-gradient-to-r from-emerald-50 via-white to-orange-50 p-6 md:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <ModuleBadge moduleId={module.id} isUnlocked={true} size="lg" />
            <div className="text-center sm:text-left flex-1">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-100/70 px-3 py-1 text-xs font-bold text-emerald-800">
                <MaterialIcon name="workspace_premium" size={16} filled />
                ¡Insignia Oficial Obtenida!
              </span>
              <h3 className="mt-2 text-xl font-extrabold text-neutral-900">
                {badgeData.badgeName}
              </h3>
              <p className="mt-1 text-sm text-neutral-600 max-w-xl">
                {badgeData.description} Esta medalla ya se encuentra registrada en tu perfil de pasante y en tu acreditación de R&amp;D.
              </p>
            </div>
            <div className="shrink-0 flex sm:flex-col gap-2">
              <Link
                href="/dashboard/perfil"
                className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-300 bg-white px-4 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-50 shadow-sm"
              >
                Ver en mi perfil
                <MaterialIcon name="arrow_forward" size={14} />
              </Link>
              {nextModule && (
                <Link
                  href={`/dashboard/modulos/${nextModule.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-orange-500 px-4 py-2 text-xs font-bold text-white hover:bg-orange-600 shadow-sm"
                >
                  Siguiente módulo
                  <MaterialIcon name="arrow_forward" size={14} />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hero del Módulo */}
      <header className="rounded-3xl border border-[#EAE5DB] bg-white p-6 md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <ModuleBadge moduleId={module.id} isUnlocked={status === "completed"} size="md" />

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[#EAE5DB] bg-[#FAF7F2] px-2.5 py-0.5 text-xs font-semibold text-neutral-600">
                  Módulo {String(module.order).padStart(2, "0")} · {module.category}
                </span>
                <span className="rounded-full border border-[#EAE5DB] bg-[#FAF7F2] px-2.5 py-0.5 text-xs font-semibold text-neutral-600">
                  {module.estimatedTime}
                </span>
              </div>
              <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#121316]">
                {module.technology}
              </h1>
              <p className="mt-1 text-sm text-[#6C707A] max-w-2xl">
                {module.overview}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5 self-start sm:self-auto">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                status === "completed"
                  ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border border-[#F05A28]/30 bg-[#F05A28]/10 text-[#F05A28]"
              }`}
            >
              <MaterialIcon
                name={status === "completed" ? "check_circle" : "hourglass_top"}
                size={14}
                filled
              />
              {status === "completed" ? "Módulo completado" : "En progreso"}
            </span>
            <span className="text-xs font-semibold text-neutral-500">
              {progressPercent}% completado
            </span>
          </div>
        </div>

        {/* Barra de progreso visual */}
        <div className="mt-6">
          <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
            <div
              className={`h-full transition-all duration-500 ${
                status === "completed" ? "bg-emerald-500" : "bg-[#F05A28]"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Objetivos clave */}
        <div className="mt-6 rounded-2xl border border-neutral-100 bg-neutral-50/70 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
            Objetivos de aprendizaje
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm text-neutral-700">
            {module.objectives.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <MaterialIcon
                  name="check"
                  size={16}
                  className="text-emerald-600 shrink-0 mt-0.5"
                />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* PASO 1: Materiales de Aprendizaje y Lecciones */}
      <section className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-neutral-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Paso 1 de 3 · Materiales y Lecciones
            </span>
            <h2 className="mt-0.5 text-xl font-bold text-neutral-900">
              Guía técnica y conceptos fundamentales
            </h2>
          </div>
          <span className="text-xs font-semibold text-neutral-500">
            {completedLessons.length} de {module.lessons.length} lecciones vistas
          </span>
        </div>

        <div className="mt-6 space-y-6">
          {module.lessons.map((lesson, idx) => {
            const done = completedLessons.includes(lesson.id);
            return (
              <article
                key={lesson.id}
                className={`rounded-2xl border p-5 sm:p-6 transition-all ${
                  done
                    ? "border-emerald-200 bg-emerald-50/20"
                    : "border-neutral-200 bg-white"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-xs font-bold text-neutral-700">
                      {idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-neutral-900">
                      {lesson.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleLessonComplete(module.id, lesson.id)}
                    className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                      done
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        : "border-neutral-200 bg-white text-neutral-700 hover:border-orange-300 hover:text-orange-700"
                    }`}
                  >
                    <MaterialIcon
                      name={done ? "check_circle" : "radio_button_unchecked"}
                      size={16}
                      filled={done}
                    />
                    {done ? "Lección completada" : "Marcar como vista"}
                  </button>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {lesson.summary}
                </p>

                <ul className="mt-4 space-y-2 rounded-xl border border-neutral-100 bg-neutral-50/60 p-4">
                  {lesson.keyPoints.map((point, pIdx) => (
                    <li
                      key={pIdx}
                      className="flex items-start gap-2 text-sm text-neutral-700"
                    >
                      <MaterialIcon
                        name="arrow_right"
                        size={18}
                        className="text-orange-500 shrink-0 mt-0.5"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {lesson.codeSnippet && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-neutral-200 bg-white">
                    <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-4 py-2 text-xs font-semibold text-neutral-600">
                      <span className="flex items-center gap-1.5">
                        <MaterialIcon name="code" size={16} className="text-orange-500" />
                        {lesson.codeTitle ?? "Ejemplo técnico"}
                      </span>
                      {lesson.codeLanguage && (
                        <span className="font-mono uppercase text-[11px] text-neutral-400">
                          {lesson.codeLanguage}
                        </span>
                      )}
                    </div>
                    <pre className="overflow-x-auto p-4 text-xs sm:text-sm leading-relaxed font-mono text-neutral-800 bg-white">
                      <code>{lesson.codeSnippet}</code>
                    </pre>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* PASO 2: Evaluación rápida de verificación */}
      <section className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-neutral-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Paso 2 de 3 · Verificación de aprendizaje
            </span>
            <h2 className="mt-0.5 text-xl font-bold text-neutral-900">
              Evaluación rápida de {module.shortTitle}
            </h2>
          </div>

          {quizAlreadyPassed && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <MaterialIcon name="check_circle" size={15} filled />
              Evaluación aprobada (3/3)
            </span>
          )}
        </div>

        <div className="mt-6 space-y-6">
          {module.quiz.map((q, qIdx) => {
            const chosen = selectedAnswers[q.id];
            const isCorrect = chosen === q.correctIndex;

            return (
              <div
                key={q.id}
                className="rounded-2xl border border-neutral-200 bg-white p-5"
              >
                <p className="text-sm font-bold text-neutral-900">
                  {qIdx + 1}. {q.question}
                </p>

                <div className="mt-3.5 space-y-2">
                  {q.options.map((option, oIdx) => {
                    const selected = chosen === oIdx;
                    let optionStyle =
                      "border-neutral-200 bg-white text-neutral-700 hover:border-orange-300";

                    if (quizSubmitted) {
                      if (oIdx === q.correctIndex) {
                        optionStyle =
                          "border-emerald-300 bg-emerald-50 text-emerald-900 font-semibold";
                      } else if (selected && !isCorrect) {
                        optionStyle =
                          "border-red-300 bg-red-50 text-red-800";
                      }
                    } else if (selected) {
                      optionStyle =
                        "border-orange-400 bg-orange-50/70 text-neutral-900 font-semibold";
                    }

                    return (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => {
                          setQuizSubmitted(false);
                          setSelectedAnswers((prev) => ({
                            ...prev,
                            [q.id]: oIdx,
                          }));
                        }}
                        className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors cursor-pointer ${optionStyle}`}
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <p
                    className={`mt-3 text-xs font-medium ${
                      isCorrect ? "text-emerald-700" : "text-red-600"
                    }`}
                  >
                    {isCorrect ? "Correcto: " : "Revisa este concepto: "}
                    {q.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleValidateQuiz}
            disabled={Object.keys(selectedAnswers).length < module.quiz.length}
            className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <MaterialIcon name="fact_check" size={18} />
            Validar respuestas
          </button>

          {quizSubmitted && (
            <p
              className={`text-sm font-semibold ${
                quizScore === module.quiz.length
                  ? "text-emerald-700"
                  : "text-orange-700"
              }`}
            >
              Resultado: {quizScore} de {module.quiz.length} respuestas correctas.
              {quizScore < module.quiz.length &&
                " Corrige las respuestas señaladas para aprobar."}
            </p>
          )}
        </div>
      </section>

      {/* PASO 3: Masterclass en Video de YouTube & Desbloqueo de Insignia */}
      <section className="rounded-3xl border border-[#EAE5DB] bg-white p-6 md:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-[#EAE5DB]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#F05A28]">
              Paso 3 de 3 · Masterclass en Video &amp; Acreditación
            </span>
            <h2 className="mt-0.5 text-xl font-bold text-[#121316]">
              Video tutorial formativo de {module.technology}
            </h2>
          </div>

          {isVideoWatched && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <MaterialIcon name="check_circle" size={15} filled />
              Video completado al 100%
            </span>
          )}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-neutral-600">
          Para acreditar este módulo y conseguir tu{" "}
          <strong className="text-neutral-900">Insignia Oficial de {module.technology}</strong>
          , reproduce la masterclass completa a continuación. Los líderes del departamento de R&amp;D han seleccionado este video con los fundamentos indispensables.
        </p>

        {/* Reproductor de Video de YouTube con margen estilizado */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 shadow-md">
          {/* Barra superior de información del video */}
          <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950 px-4 py-2.5 text-xs text-neutral-300">
            <span className="flex items-center gap-2 font-medium">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              {badgeData?.videoTitle ?? `Masterclass oficial: ${module.technology}`}
            </span>
            <span className="font-mono text-neutral-400">
              {badgeData?.videoDuration ?? "30 min"}
            </span>
          </div>

          {/* Iframe 16:9 responsive */}
          <div className="relative w-full aspect-video">
            <iframe
              src={badgeData?.youtubeUrl ?? "https://www.youtube.com/embed/RGOj5yH7evk"}
              title={`Video de formación ${module.technology}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>

          {/* Barra inferior de confirmación de visualización */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-neutral-950 p-4 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <MaterialIcon name="play_circle" size={18} className="text-red-500" />
              <span>Instrucción R&amp;D: Mira el video atentamente antes de finalizar el módulo.</span>
            </div>

            <button
              type="button"
              onClick={() => toggleVideoWatched(module.id)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                isVideoWatched
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
              }`}
            >
              <MaterialIcon
                name={isVideoWatched ? "check_circle" : "visibility"}
                size={16}
                filled={isVideoWatched}
              />
              {isVideoWatched ? "¡Video visto al 100%!" : "Marcar video como visto"}
            </button>
          </div>
        </div>

        {/* Tarjeta de Insignia a Desbloquear */}
        {badgeData && (
          <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5 flex flex-col sm:flex-row items-center gap-5">
            <ModuleBadge moduleId={module.id} isUnlocked={status === "completed"} size="md" />
            <div className="flex-1 text-center sm:text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                Insignia oficial a acreditar
              </span>
              <h4 className="text-base font-extrabold text-neutral-900">
                {badgeData.badgeName}
              </h4>
              <p className="text-xs text-neutral-600 mt-0.5">
                Al completar este módulo se otorgará esta insignia con el logo oficial de {module.technology} para tu expediente técnico de pasante.
              </p>
            </div>
            {status === "completed" && (
              <span className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
                Desbloqueada
              </span>
            )}
          </div>
        )}

        {/* Formulario de Aprobación Final */}
        <form onSubmit={handleCompleteModule} className="mt-6 space-y-5">
          {/* Requisitos pendientes para desbloquear */}
          {!canUnlockNext && status !== "completed" && (
            <div className="rounded-xl border border-[#F05A28]/30 bg-[#F05A28]/10 p-4 text-xs text-neutral-700">
              <p className="font-bold text-[#F05A28] mb-1.5">
                Para completar el módulo y recibir tu Insignia debes cumplir:
              </p>
              <ul className="space-y-1 list-disc pl-4 font-medium text-neutral-700">
                {!allLessonsDone && (
                  <li>Marcar todas las lecciones del Paso 1 como vistas ({completedLessons.length}/{module.lessons.length}).</li>
                )}
                {!isVideoWatched && (
                  <li>Ver y marcar el video de YouTube del Paso 3 como completado.</li>
                )}
                {!quizAlreadyPassed && (
                  <li>Aprobar la evaluación rápida del Paso 2 (3/3 respuestas correctas).</li>
                )}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="submit"
              disabled={!canUnlockNext}
              className="inline-flex items-center gap-2 rounded-xl bg-[#F05A28] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#E04D1B] disabled:bg-neutral-200 disabled:text-neutral-500 disabled:cursor-not-allowed cursor-pointer shadow-sm"
            >
              <MaterialIcon
                name={nextModule ? "workspace_premium" : "emoji_events"}
                size={18}
              />
              {status === "completed"
                ? "Módulo completado e Insignia activa"
                : nextModule
                  ? `Completar módulo y obtener Insignia de ${module.technology}`
                  : "Completar último módulo y emitir Certificado Final"}
            </button>

            {status === "completed" && nextModule && (
              <Link
                href={`/dashboard/modulos/${nextModule.slug}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-800 hover:border-orange-300 hover:text-orange-700"
              >
                Ir a {nextModule.shortTitle}
                <MaterialIcon name="arrow_forward" size={18} />
              </Link>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
