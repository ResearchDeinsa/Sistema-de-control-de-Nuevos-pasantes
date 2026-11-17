"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  getNextModule,
  ONBOARDING_MODULES,
  type OnboardingModule,
} from "@/src/services/onboardingModules";
import { useDashboard } from "./DashboardProvider";
import { MaterialIcon } from "./MaterialIcon";

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
    markQuizPassed,
    completeModule,
  } = useDashboard();

  const status = getModuleStatus(module.id);
  const progressPercent = getModuleProgressPercent(module);
  const nextModule = getNextModule(module.slug);
  const prevModule =
    module.order > 1 ? ONBOARDING_MODULES[module.order - 2] : undefined;

  const completedLessons = progress.completedLessonIds[module.id] ?? [];
  const allLessonsDone = module.lessons.every((lesson) =>
    completedLessons.includes(lesson.id)
  );
  const quizAlreadyPassed =
    progress.quizPassedIds.includes(module.id) || status === "completed";

  const savedEvidence = progress.evidenceByModule[module.id];

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>(
    {}
  );
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [evidenceText, setEvidenceText] = useState(
    savedEvidence?.urlOrNote ?? ""
  );
  const [checklist, setChecklist] = useState<boolean[]>(() =>
    savedEvidence?.checklistDone?.length === module.practiceChecklist.length
      ? savedEvidence.checklistDone
      : module.practiceChecklist.map(() => status === "completed")
  );
  const [justCompleted, setJustCompleted] = useState(false);

  const quizScore = useMemo(() => {
    return module.quiz.reduce((acc, q) => {
      return acc + (selectedAnswers[q.id] === q.correctIndex ? 1 : 0);
    }, 0);
  }, [module.quiz, selectedAnswers]);

  const allChecklistChecked = checklist.every(Boolean);
  const hasEvidence = evidenceText.trim().length >= 5;
  const canUnlockNext =
    allLessonsDone && quizAlreadyPassed && allChecklistChecked && hasEvidence;

  function handleValidateQuiz() {
    setQuizSubmitted(true);
    if (quizScore === module.quiz.length) {
      markQuizPassed(module.id);
    }
  }

  function handleChecklistToggle(index: number) {
    setChecklist((prev) => prev.map((val, i) => (i === index ? !val : val)));
  }

  function handleCompleteModule(e: React.FormEvent) {
    e.preventDefault();
    if (!canUnlockNext) return;
    completeModule(module.id, {
      urlOrNote: evidenceText,
      checklistDone: checklist,
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

        <div className="mt-6 rounded-3xl border border-neutral-200 bg-white p-8 md:p-10 text-center">
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

        <span className="text-xs font-semibold text-neutral-500">
          Módulo {module.order} de {ONBOARDING_MODULES.length}
        </span>
      </div>

      {/* Cabecera del módulo */}
      <header className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                <MaterialIcon name={module.icon} size={15} filled />
                Módulo {String(module.order).padStart(2, "0")} · {module.category}
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${
                  status === "completed"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-neutral-200 bg-neutral-50 text-neutral-700"
                }`}
              >
                <MaterialIcon
                  name={status === "completed" ? "check_circle" : "schedule"}
                  size={15}
                  filled={status === "completed"}
                />
                {status === "completed"
                  ? "Completado"
                  : `Duración estimada: ${module.estimatedTime}`}
              </span>
            </div>

            <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
              {module.technology}
            </h1>
            <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-neutral-600">
              {module.overview}
            </p>
          </div>

          {/* Tarjeta de avance del módulo */}
          <div className="w-full lg:w-64 shrink-0 rounded-2xl border border-neutral-200 bg-white p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-500">
              <span>Avance del módulo</span>
              <span className="text-neutral-900">{progressPercent}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-neutral-100">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progressPercent}%`,
                  backgroundColor: status === "completed" ? "#10B981" : "#F47F27",
                }}
              />
            </div>
            <ul className="mt-3.5 space-y-2 text-xs text-neutral-600">
              <li className="flex items-center gap-2">
                <MaterialIcon
                  name={allLessonsDone ? "check_circle" : "radio_button_unchecked"}
                  size={16}
                  filled={allLessonsDone}
                  className={allLessonsDone ? "text-emerald-600" : "text-neutral-400"}
                />
                Lecciones ({completedLessons.length}/{module.lessons.length})
              </li>
              <li className="flex items-center gap-2">
                <MaterialIcon
                  name={quizAlreadyPassed ? "check_circle" : "radio_button_unchecked"}
                  size={16}
                  filled={quizAlreadyPassed}
                  className={quizAlreadyPassed ? "text-emerald-600" : "text-neutral-400"}
                />
                Evaluación técnica
              </li>
              <li className="flex items-center gap-2">
                <MaterialIcon
                  name={status === "completed" ? "check_circle" : "radio_button_unchecked"}
                  size={16}
                  filled={status === "completed"}
                  className={status === "completed" ? "text-emerald-600" : "text-neutral-400"}
                />
                Reto práctico entregado
              </li>
            </ul>
          </div>
        </div>

        {/* Ficha resumen: Qué aprende + Formato sugerido */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-neutral-100">
          <div className="rounded-2xl border border-neutral-200 bg-white p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
              <MaterialIcon name="target" size={16} className="text-orange-500" />
              Qué debe aprender el pasante
            </div>
            <p className="mt-1.5 text-sm font-semibold text-neutral-900">
              {module.whatInternLearns}
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
              <MaterialIcon name="school" size={16} className="text-orange-500" />
              Formato sugerido
            </div>
            <p className="mt-1.5 text-sm font-semibold text-neutral-900">
              {module.suggestedFormat}
            </p>
          </div>
        </div>
      </header>

      {/* Banner de éxito al completar el módulo */}
      {(justCompleted || status === "completed") && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5">
          <div className="flex items-start gap-3">
            <MaterialIcon
              name="verified"
              size={24}
              filled
              className="text-emerald-600 shrink-0 mt-0.5"
            />
            <div>
              <h2 className="text-sm font-bold text-emerald-900">
                Módulo completado con éxito
              </h2>
              <p className="mt-0.5 text-xs sm:text-sm text-emerald-800">
                {nextModule
                  ? `Has desbloqueado el siguiente módulo: ${nextModule.technology}.`
                  : "Has finalizado los 8 módulos técnicos. Tu Certificado Final oficial ya está disponible."}
              </p>
            </div>
          </div>
          {nextModule ? (
            <Link
              href={`/dashboard/modulos/${nextModule.slug}`}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              Siguiente: {nextModule.shortTitle}
              <MaterialIcon name="arrow_forward" size={16} />
            </Link>
          ) : (
            <Link
              href="/dashboard/modulos#certificado-final"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Ver Certificado Final
              <MaterialIcon name="workspace_premium" size={16} />
            </Link>
          )}
        </div>
      )}

      {/* Objetivos y Recursos */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="flex items-center gap-2 text-base font-bold text-neutral-900">
            <MaterialIcon name="checklist" size={20} className="text-orange-500" />
            Objetivos de aprendizaje
          </h2>
          <ul className="mt-4 space-y-2.5">
            {module.objectives.map((objective, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-700">
                <MaterialIcon
                  name="check"
                  size={18}
                  className="text-orange-500 shrink-0 mt-0.5"
                />
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="flex items-center gap-2 text-base font-bold text-neutral-900">
            <MaterialIcon name="library_books" size={20} className="text-orange-500" />
            Documentación oficial
          </h2>
          <div className="mt-4 space-y-2.5">
            {module.resources.map((res) => (
              <a
                key={res.url}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white px-3.5 py-3 text-sm transition-colors hover:border-orange-300 hover:bg-orange-50/30"
              >
                <div>
                  <p className="font-semibold text-neutral-900 text-xs sm:text-sm">
                    {res.label}
                  </p>
                  <p className="text-[11px] font-medium text-neutral-500">
                    {res.type}
                  </p>
                </div>
                <MaterialIcon
                  name="open_in_new"
                  size={16}
                  className="text-neutral-400 shrink-0"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PASO 1: Lecciones formativas */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Paso 1 de 3 · Contenido formativo
            </span>
            <h2 className="mt-0.5 text-xl font-bold text-neutral-900">
              Lecciones y guía técnica
            </h2>
          </div>
          <span className="text-xs font-semibold text-neutral-500">
            {completedLessons.length} de {module.lessons.length} completadas
          </span>
        </div>

        <div className="space-y-4">
          {module.lessons.map((lesson, idx) => {
            const done = completedLessons.includes(lesson.id);
            return (
              <article
                key={lesson.id}
                className={`rounded-2xl border bg-white p-6 transition-colors ${
                  done ? "border-emerald-200" : "border-neutral-200"
                }`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
                      <span>Lección {idx + 1}</span>
                      <span>·</span>
                      <span>{lesson.duration}</span>
                    </div>
                    <h3 className="mt-1 text-lg font-bold text-neutral-900">
                      {lesson.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleLessonComplete(module.id, lesson.id)}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors ${
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
              Evaluación aprobada
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
                        className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${optionStyle}`}
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
            className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed"
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

      {/* PASO 3: Reto práctico y Gating para desbloquear el siguiente módulo */}
      <section className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-8">
        <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
          Paso 3 de 3 · Práctica y desbloqueo progresivo
        </span>
        <h2 className="mt-0.5 text-xl font-bold text-neutral-900">
          {module.practiceTitle}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          {module.practiceDescription}
        </p>

        <form onSubmit={handleCompleteModule} className="mt-6 space-y-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
              Criterios de entrega
            </p>
            <div className="space-y-2.5">
              {module.practiceChecklist.map((item, idx) => (
                <label
                  key={idx}
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-neutral-200 bg-white p-3.5 transition-colors hover:border-orange-300"
                >
                  <input
                    type="checkbox"
                    checked={Boolean(checklist[idx])}
                    onChange={() => handleChecklistToggle(idx)}
                    className="mt-0.5 h-4 w-4 rounded border-neutral-300 accent-orange-500"
                  />
                  <span className="text-sm text-neutral-700">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="module-evidence"
              className="block text-sm font-semibold text-neutral-800 mb-1.5"
            >
              Evidencia de entrega (enlace a repositorio, PR, flujo o notas técnicas)
            </label>
            <textarea
              id="module-evidence"
              rows={3}
              value={evidenceText}
              onChange={(e) => setEvidenceText(e.target.value)}
              placeholder={module.evidencePlaceholder}
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* Requisitos pendientes para desbloquear */}
          {!canUnlockNext && status !== "completed" && (
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-xs text-neutral-600">
              <p className="font-semibold text-neutral-800 mb-1.5">
                Para habilitar el botón de aprobación y desbloquear el siguiente módulo debes completar:
              </p>
              <ul className="space-y-1 list-disc pl-4">
                {!allLessonsDone && (
                  <li>Marcar todas las lecciones del Paso 1 como vistas.</li>
                )}
                {!quizAlreadyPassed && (
                  <li>Aprobar la evaluación rápida del Paso 2 (3/3 respuestas correctas).</li>
                )}
                {!allChecklistChecked && (
                  <li>Confirmar todos los criterios de la lista de entrega.</li>
                )}
                {!hasEvidence && (
                  <li>Ingresar tu enlace o descripción de evidencia (mínimo 5 caracteres).</li>
                )}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="submit"
              disabled={!canUnlockNext}
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:bg-neutral-200 disabled:text-neutral-500 disabled:cursor-not-allowed"
            >
              <MaterialIcon
                name={nextModule ? "lock_open" : "workspace_premium"}
                size={18}
              />
              {status === "completed"
                ? "Actualizar evidencia del módulo"
                : nextModule
                  ? `Aprobar módulo y desbloquear ${nextModule.shortTitle}`
                  : "Completar último módulo y emitir Certificado"}
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
