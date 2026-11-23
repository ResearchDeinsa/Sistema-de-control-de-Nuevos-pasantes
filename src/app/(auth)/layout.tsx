import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "@/src/components/dashboard/MaterialIcon";
import { InteractiveAuthBackground } from "@/src/components/auth/InteractiveAuthBackground";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-neutral-950 text-white flex flex-col lg:flex-row select-none">
      {/* Fondo Interactivo con Partículas y Constelación reactiva al ratón */}
      <InteractiveAuthBackground />

      {/* Orbes de luz ambiental flotantes */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-orange-600/15 blur-[140px] animate-pulse" />
      <div className="pointer-events-none absolute top-1/2 -right-40 h-[600px] w-[600px] rounded-full bg-blue-600/15 blur-[140px] animate-pulse" style={{ animationDelay: "2s" }} />
      <div className="pointer-events-none absolute -bottom-40 left-1/3 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[130px]" />

      {/* Cuadrícula isométrica sutil */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Panel Izquierdo: Presentación Institucional R&D de Alta Fidelidad */}
      <div className="relative z-10 hidden lg:flex lg:w-1/2 xl:w-7/12 flex-col justify-between p-12 xl:p-16 border-r border-white/10 backdrop-blur-[2px]">
        {/* Encabezado Superior con Logotipo Oficial */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex flex-col gap-1.5 group">
            <Image
              src="/deinsa logo.svg"
              alt="Deinsa Global Intelligence"
              width={165}
              height={62}
              className="h-10 w-auto object-contain object-left invert transition-transform group-hover:scale-105"
              priority
            />
            <div className="flex items-center gap-2">
              <span className="flex h-1.5 w-1.5 rounded-full bg-orange-500 animate-ping" />
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-orange-400">
                Leadership Acceleration Program · R&amp;D
              </span>
            </div>
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-semibold text-neutral-200 backdrop-blur-md shadow-inner">
            <MaterialIcon name="verified_user" size={14} className="text-orange-400" />
            <span>Sistema Institucional R&amp;D</span>
          </div>
        </div>

        {/* Contenido Central: Propuesta de Valor & Animación de Nodos */}
        <div className="my-auto py-8 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-bold text-orange-400 mb-5">
            <MaterialIcon name="auto_awesome" size={14} filled />
            <span>Innovación, Datos y Automatización</span>
          </div>

          <h1 className="text-3xl xl:text-5xl font-extrabold tracking-tight text-white leading-[1.14]">
            Potencia tu talento en la vanguardia tecnológica.
          </h1>

          <p className="mt-4 text-sm xl:text-base leading-relaxed text-neutral-300">
            Bienvenido al entorno de inducción técnica del equipo de Research &amp; Development. Domina 8 tecnologías clave mediante retos prácticos, masterclasses en video y proyectos en producción.
          </p>

          {/* Tres Pilares Tecnológicos con Iconos Google Fonts */}
          <div className="mt-8 grid grid-cols-1 gap-3.5">
            <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md transition-all hover:bg-white/[0.08] hover:border-orange-500/30 group">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 shadow-sm group-hover:scale-110 transition-transform">
                <MaterialIcon name="school" size={20} />
              </div>
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                  8 Módulos Técnicos Progresivos
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                  Git &amp; GitHub, React con TypeScript, Node.js REST, Supabase con RLS, Notion, Make, n8n y Google Gemini AI.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md transition-all hover:bg-white/[0.08] hover:border-blue-500/30 group">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-sm group-hover:scale-110 transition-transform">
                <MaterialIcon name="workspace_premium" size={20} filled />
              </div>
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                  Insignias Oficiales y Certificación Final
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                  Cada módulo desbloquea su medalla oficial con el logo de la tecnología y genera un certificado con ID criptográfico único.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md transition-all hover:bg-white/[0.08] hover:border-emerald-500/30 group">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-sm group-hover:scale-110 transition-transform">
                <MaterialIcon name="hub" size={20} />
              </div>
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Tablero de Proyectos en Creación (Trello)
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                  Seguimiento activo en tiempo real: Mariano en el proyecto CRM, el equipo de pasantes y Kevin en la Plataforma de Aprendizaje.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pie Institucional */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-neutral-400">
          <p>© 2026 Deinsa Global. Todos los derechos reservados.</p>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <MaterialIcon name="shield" size={14} />
              Entorno Staging Verificado
            </span>
            <span className="text-neutral-600">·</span>
            <span>Versión 2.5.0</span>
          </div>
        </div>
      </div>

      {/* Panel Derecho: Tarjeta de Acceso Flotante de Alta Fidelidad */}
      <div className="relative z-10 flex flex-1 flex-col justify-center items-center px-4 py-12 sm:px-8 lg:px-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
