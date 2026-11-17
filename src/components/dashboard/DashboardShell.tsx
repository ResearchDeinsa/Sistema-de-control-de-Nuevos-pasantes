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
    <div className="flex h-full flex-col justify-between bg-white px-4 py-6">
      <div>
        {/* Logo oficial Deinsa Global Intelligence */}
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
            className="h-9 w-auto object-contain object-left"
            priority
          />
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
            Onboarding · R&amp;D
          </span>
        </Link>

        {/* Menú de navegación */}
        <div className="mt-7">
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
            Navega
          </p>
          <nav className="mt-2.5 space-y-1" aria-label="Navegación principal">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-all ${
                  item.active
                    ? "bg-orange-500 text-white shadow-sm"
                    : "text-neutral-600 hover:bg-neutral-100/80 hover:text-neutral-900"
                }`}
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  <MaterialIcon
                    name={item.icon}
                    size={18}
                    filled={item.active}
                  />
                  <span className="truncate">{item.label}</span>
                </span>
                {item.badge && (
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                      item.active
                        ? "bg-white/20 text-white"
                        : item.badge === "Listo"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-neutral-100 text-neutral-600"
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

      {/* Zona inferior de la barra lateral (inspirada en referencia, totalmente en blanco) */}
      <div className="space-y-3.5 pt-6 border-t border-neutral-100">
        {/* Tarjeta de nivel / progreso */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-4">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
            <span className="text-neutral-400">Nivel {completedCount + 1}</span>
            <span className="text-orange-600">
              {completedCount} / {totalModules} módulos
            </span>
          </div>
          <p className="mt-1 text-sm font-bold text-neutral-900">{levelTitle}</p>
          <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
            <div
              className="h-full rounded-full bg-orange-500 transition-all duration-500"
              style={{ width: `${Math.max(overallProgressPercent, 4)}%` }}
            />
          </div>
        </div>

        {/* Tarjeta de usuario + acceso a perfil + cierre de sesión */}
        <div className="flex items-center justify-between gap-2 rounded-2xl border border-neutral-200 bg-white p-3">
          <Link
            href="/dashboard/perfil"
            onClick={() => setMobileMenuOpen(false)}
            className="flex min-w-0 items-center gap-3 group"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-extrabold text-white">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-neutral-900 group-hover:text-orange-600 transition-colors">
                {fullName}
              </p>
              <p className="truncate text-xs text-neutral-500">
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
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
          >
            <MaterialIcon name="logout" size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-white-root min-h-screen bg-white text-neutral-900 flex flex-col lg:flex-row">
      {/* Barra móvil */}
      <header className="no-print sticky top-0 z-30 flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3 lg:hidden">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src="/deinsa logo.svg"
            alt="Deinsa Global Intelligence"
            width={120}
            height={47}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>
        <button
          type="button"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Abrir menú de navegación"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-700"
        >
          <MaterialIcon name={mobileMenuOpen ? "close" : "menu"} size={22} />
        </button>
      </header>

      {/* Drawer móvil */}
      {mobileMenuOpen && (
        <div className="no-print fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-neutral-900/20 backdrop-blur-[1px]"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-72 border-r border-neutral-200 bg-white shadow-xl">
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Sidebar escritorio fija (totalmente blanca) */}
      <aside className="no-print hidden lg:block lg:w-64 lg:shrink-0 border-r border-neutral-200 bg-white">
        <div className="sticky top-0 h-screen overflow-y-auto">
          {sidebarContent}
        </div>
      </aside>

      {/* Contenido principal en blanco */}
      <main className="flex-1 min-w-0 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
