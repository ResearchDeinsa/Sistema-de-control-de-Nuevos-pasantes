"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ONBOARDING_MODULES } from "@/src/services/onboardingModules";
import { getFullName, type UserProfile } from "@/src/services/profileService";
import { MaterialIcon } from "./MaterialIcon";

interface CertificateCardProps {
  profile: UserProfile;
  certificateId: string;
  completedCount: number;
  totalModules: number;
  allModulesCompleted: boolean;
  completedAllAt: string | null;
}

function formatSpanishDate(iso: string | null): string {
  const date = iso ? new Date(iso) : new Date();
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function CertificateCard({
  profile,
  certificateId,
  completedCount,
  totalModules,
  allModulesCompleted,
  completedAllAt,
}: CertificateCardProps) {
  const [copied, setCopied] = useState(false);
  const fullName = getFullName(profile);
  const missingModules = totalModules - completedCount;

  async function handleCopyId() {
    try {
      await navigator.clipboard.writeText(certificateId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Sin acceso a portapapeles
    }
  }

  function handlePrintCertificate() {
    window.print();
  }

  return (
    <section
      id="certificado-final"
      className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm"
    >
      {/* Encabezado de sección */}
      <div className="no-print flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-neutral-100">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
            <MaterialIcon name="workspace_premium" size={16} filled />
            Certificación Oficial · Leadership Acceleration Program
          </div>
          <h2 className="mt-2.5 text-xl md:text-2xl font-bold text-neutral-900">
            Certificado Final de Capacitación Técnica
          </h2>
          <p className="mt-1 text-sm text-neutral-600">
            {allModulesCompleted
              ? "Has completado todos los módulos de enseñanza. Tu certificado oficial ya se encuentra emitido y listo para descargar."
              : `Completa los ${missingModules} módulo${missingModules === 1 ? "" : "s"} restante${missingModules === 1 ? "" : "s"} para desbloquear y emitir tu certificado oficial.`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/dashboard/perfil"
            className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
          >
            <MaterialIcon name="edit" size={16} />
            Editar nombre y apellidos
          </Link>

          {allModulesCompleted && (
            <>
              <button
                type="button"
                onClick={handleCopyId}
                className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
              >
                <MaterialIcon name={copied ? "check" : "content_copy"} size={16} />
                {copied ? "ID copiado" : "Copiar ID"}
              </button>
              <button
                type="button"
                onClick={handlePrintCertificate}
                className="inline-flex items-center gap-1.5 rounded-xl bg-orange-500 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-orange-600"
              >
                <MaterialIcon name="print" size={16} />
                Imprimir / Guardar PDF
              </button>
            </>
          )}
        </div>
      </div>

      {/* Marco visual del Certificado */}
      <div className="relative mt-6">
        <div
          id="certificate-printable-sheet"
          className={`relative overflow-hidden rounded-2xl border-2 bg-white p-6 sm:p-10 transition-all ${
            allModulesCompleted
              ? "border-neutral-900 shadow-sm"
              : "border-dashed border-neutral-300"
          }`}
        >
          {/* Acentos geométricos limpios en las esquinas */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-neutral-900 via-orange-500 to-neutral-400"
          />

          {/* Fila superior: Logo Deinsa Global + ID Único */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between pt-2">
            <div className="flex items-center gap-4">
              <Image
                src="/deinsa logo.svg"
                alt="Deinsa Global Intelligence"
                width={156}
                height={61}
                className="h-11 w-auto object-contain"
                priority
              />
            </div>

            <div className="sm:text-right">
              <span className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
                ID Único de Certificación
              </span>
              <span className="mt-1 inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 font-mono text-xs font-bold tracking-wider text-neutral-900">
                <MaterialIcon
                  name={allModulesCompleted ? "verified" : "lock"}
                  size={15}
                  filled={allModulesCompleted}
                  className={allModulesCompleted ? "text-orange-500" : "text-neutral-400"}
                />
                {certificateId}
              </span>
            </div>
          </div>

          {/* Cuerpo central del certificado */}
          <div className="my-8 sm:my-10 text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">
              Deinsa Global · Research &amp; Development
            </p>
            <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
              Certificado de Finalización
            </h3>
            <p className="mt-4 text-sm text-neutral-500">
              Se otorga el presente reconocimiento oficial a
            </p>

            {/* Nombre y Apellidos de la persona */}
            <div className="mt-3 pb-3 border-b-2 border-neutral-200 inline-block min-w-[260px] sm:min-w-[380px] px-4">
              <p className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
                {fullName}
              </p>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              Por haber cursado y aprobado satisfactoriamente los{" "}
              <strong className="font-semibold text-neutral-900">
                {totalModules} módulos progresivos
              </strong>{" "}
              del Programa de Onboarding y Capacitación Técnica del{" "}
              <strong className="font-semibold text-neutral-900">
                Leadership Acceleration Program
              </strong>
              .
            </p>

            {/* Etiquetas de tecnologías completadas */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {ONBOARDING_MODULES.map((mod) => (
                <span
                  key={mod.id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700"
                >
                  <MaterialIcon name={mod.icon} size={14} className="text-orange-500" />
                  {mod.shortTitle}
                </span>
              ))}
            </div>
          </div>

          {/* Pie de firma y fecha */}
          <div className="mt-8 pt-6 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end text-center sm:text-left">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                Fecha de emisión
              </p>
              <p className="mt-1 text-sm font-semibold text-neutral-900">
                {allModulesCompleted ? formatSpanishDate(completedAllAt) : "Pendiente de finalización"}
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-44 border-b border-neutral-400 pb-1 text-sm font-bold text-neutral-900">
                Luis Diego Umaña
              </div>
              <p className="mt-1 text-[11px] font-medium text-neutral-500">
                Jefe de Research &amp; Development · Deinsa Global
              </p>
            </div>

            <div className="sm:text-right">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                Estado del documento
              </p>
              <p
                className={`mt-1 inline-flex items-center gap-1 text-sm font-bold ${
                  allModulesCompleted ? "text-emerald-700" : "text-neutral-500"
                }`}
              >
                <MaterialIcon
                  name={allModulesCompleted ? "verified_user" : "hourglass_top"}
                  size={16}
                  filled={allModulesCompleted}
                />
                {allModulesCompleted ? "Verificado y Emitido" : `${completedCount} / ${totalModules} módulos`}
              </p>
            </div>
          </div>

          {/* Capa informativa cuando aún faltan módulos */}
          {!allModulesCompleted && (
            <div className="no-print absolute inset-0 flex flex-col items-center justify-center bg-white/85 backdrop-blur-[2px] p-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50 text-orange-600">
                <MaterialIcon name="lock" size={28} filled />
              </div>
              <h4 className="mt-4 text-lg font-bold text-neutral-900">
                Certificado bloqueado hasta completar la ruta
              </h4>
              <p className="mt-1.5 max-w-md text-sm text-neutral-600">
                Llevas <strong className="text-neutral-900">{completedCount} de {totalModules}</strong> módulos aprobados. Al finalizar el último módulo se desbloqueará automáticamente con tu nombre{" "}
                <strong className="text-neutral-900">{fullName}</strong> y tu ID único{" "}
                <span className="font-mono font-semibold text-neutral-900">{certificateId}</span>.
              </p>
              <div className="mt-4 w-full max-w-xs">
                <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="h-full rounded-full bg-orange-500 transition-all duration-500"
                    style={{ width: `${Math.round((completedCount / totalModules) * 100)}%` }}
                  />
                </div>
                <p className="mt-1.5 text-xs font-semibold text-neutral-500">
                  Progreso hacia la certificación: {Math.round((completedCount / totalModules) * 100)}%
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
