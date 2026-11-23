"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOutUser } from "@/src/actions/profile";
import { getFullName, getInitials } from "@/src/services/profileService";
import { useDashboard } from "./DashboardProvider";
import { MaterialIcon } from "./MaterialIcon";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    profile,
    completedCount,
    totalModules,
    overallProgressPercent,
    allModulesCompleted,
    clearLocalSession,
  } = useDashboard();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const fullName = getFullName(profile);
  const initials = getInitials(profile);

  const navItems = [
    {
      label: "Centro de mando",
      href: "/dashboard",
      icon: "space_dashboard",
      active: pathname === "/dashboard",
      badge: null as string | null,
    },
    {
      label: "Módulos de enseñanza",
      href: "/dashboard/modulos",
      icon: "menu_book",
      active: pathname.startsWith("/dashboard/modulos"),
      badge: `${completedCount}/${totalModules}`,
    },
    {
      label: "Universos Técnicos",
      href: "/dashboard/universos",
      icon: "travel_explore",
      active: pathname.startsWith("/dashboard/universos"),
      badge: "Pistas & Tips",
    },
    ...(allModulesCompleted ||
    profile.role.toLowerCase().includes("líder") ||
    profile.role.toLowerCase().includes("supervisor") ||
    profile.role.toLowerCase().includes("admin")
      ? [
          {
            label: "Tablero Trello (Proyectos)",
            href: "/dashboard/proyectos",
            icon: "view_kanban",
            active: pathname.startsWith("/dashboard/proyectos"),
            badge: "R&D",
          },
        ]
      : []),
    {
      label: "Certificado final",
      href: "/dashboard/modulos#certificado-final",
      icon: "workspace_premium",
      active: false,
      badge: allModulesCompleted ? "Listo" : null,
    },
    {
      label: "Perfil de usuario",
      href: "/dashboard/perfil",
      icon: "person",
      active: pathname.startsWith("/dashboard/perfil"),
      badge: null as string | null,
    },
  ];

  const levelTitle =
    completedCount === totalModules
      ? "Certificado LAP"
      : completedCount >= 5
        ? "Constructor"
        : completedCount >= 2
          ? "En progreso"
          : "Explorador";

  async function handleQuickSignOut() {
    setSigningOut(true);
    try {
      await signOutUser();
      clearLocalSession();
      router.push("/login");
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  }

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between bg-[#131418] px-4 py-6 text-white">
      <div>
        {/* Logo oficial Deinsa Global Intelligence invertido para fondo oscuro */}
        <Link
          href="/dashboard"
          onClick={() => setMobileMenuOpen(false)}
          className="flex flex-col gap-1.5 px-2"
        >
          <Image
            src="/deinsa logo.svg"
            alt="Deinsa Global Intelligence"
            width={142}
            height={56}
            className="h-8 w-auto object-contain object-left invert"
            priority
          />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F05A28]">
            Onboarding · R&amp;D
          </span>
        </Link>

        {/* Menú de navegación */}
        <div className="mt-7">
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
            Navega
          </p>
          <nav className="mt-2.5 space-y-1.5" aria-label="Navegación principal">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between gap-2 rounded-2xl px-3.5 py-2.5 text-[13px] font-semibold transition-all duration-150 ${
                  item.active
                    ? "bg-[#F05A28] text-white shadow-md shadow-[#F05A28]/25"
                    : "text-neutral-400 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  <MaterialIcon
                    name={item.icon}
                    size={18}
                    filled={item.active}
                    className={item.active ? "text-white" : "text-neutral-400"}
                  />
                  <span className="truncate">{item.label}</span>
                </span>
                {item.badge && (
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      item.active
                        ? "bg-black/20 text-white"
                        : item.badge === "Listo"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-white/10 text-neutral-300"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Zona inferior de la barra lateral (Diseño oscuro obsidian estilo Delphos) */}
      <div className="space-y-3 pt-6 border-t border-white/10">
        {/* Tarjeta de nivel / progreso */}
        <div className="rounded-2xl border border-white/10 bg-[#1C1E24] p-3.5 shadow-sm">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
            <span className="text-neutral-400">Nivel {completedCount + 1}</span>
            <span className="text-[#F05A28]">
              {completedCount} / {totalModules} módulos
            </span>
          </div>
          <p className="mt-1 text-sm font-bold text-white">{levelTitle}</p>
          <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[#F05A28] transition-all duration-500"
              style={{ width: `${Math.max(overallProgressPercent, 4)}%` }}
            />
          </div>
        </div>

        {/* Tarjeta de usuario + acceso a perfil + cierre de sesión */}
        <div className="flex items-center justify-between gap-2 rounded-2xl border border-white/10 bg-[#1C1E24] p-3 shadow-sm">
          <Link
            href="/dashboard/perfil"
            onClick={() => setMobileMenuOpen(false)}
            className="flex min-w-0 items-center gap-2.5 group"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F05A28] text-xs font-extrabold text-white shadow-sm">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-white group-hover:text-[#F05A28] transition-colors">
                {fullName}
              </p>
              <p className="truncate text-[11px] text-neutral-400">
                {profile.role}
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={handleQuickSignOut}
            disabled={signingOut}
            title="Cerrar sesión"
            aria-label="Cerrar sesión"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-400 transition-colors hover:border-red-500/30 hover:bg-red-500/20 hover:text-red-400 disabled:opacity-50 cursor-pointer"
          >
            <MaterialIcon name="logout" size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#131418] text-neutral-900 flex flex-col lg:flex-row p-0 lg:p-3 gap-0 lg:gap-3">
      {/* Barra móvil */}
      <header className="no-print sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#131418] px-4 py-3 lg:hidden text-white">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src="/deinsa logo.svg"
            alt="Deinsa Global Intelligence"
            width={120}
            height={47}
            className="h-8 w-auto object-contain invert"
            priority
          />
        </Link>
        <button
          type="button"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Abrir menú de navegación"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white"
        >
          <MaterialIcon name={mobileMenuOpen ? "close" : "menu"} size={22} />
        </button>
      </header>

      {/* Drawer móvil */}
      {mobileMenuOpen && (
        <div className="no-print fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-[#131418] shadow-2xl">
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Sidebar escritorio fija con estética Obsidian que sigue el scroll */}
      <aside className="no-print hidden lg:flex lg:flex-col lg:w-64 xl:w-72 lg:shrink-0 sticky top-3 self-start h-[calc(100vh-1.5rem)] rounded-3xl overflow-hidden border border-white/10 bg-[#131418] z-30 shadow-xl">
        <div className="h-full overflow-y-auto">
          {sidebarContent}
        </div>
      </aside>

      {/* Lienzo Principal en Crema Cálido Delphos (#FAF7F2) */}
      <main className="flex-1 min-w-0 rounded-none lg:rounded-3xl bg-[#FAF7F2] border border-[#EAE5DB] shadow-sm">
        <div className="w-full px-4 py-6 sm:px-8 lg:px-10 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
