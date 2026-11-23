import React from "react";
import type { Metadata } from "next";
import { getCurrentUserProfile } from "@/src/actions/profile";
import { DashboardProvider } from "@/src/components/dashboard/DashboardProvider";
import { DashboardShell } from "@/src/components/dashboard/DashboardShell";
import "./dashboard.css";

export const metadata: Metadata = {
  title: "Dashboard de Módulos | Deinsa Global Onboarding",
  description:
    "Panel de enseñanza progresiva por módulos, perfil de usuario y certificación técnica de Deinsa Global.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authenticated, profile } = await getCurrentUserProfile();

  return (
    <div className="min-h-screen bg-[#131418] text-neutral-900">
      <DashboardProvider initialProfile={profile} authenticated={authenticated}>
        <DashboardShell>{children}</DashboardShell>
      </DashboardProvider>
    </div>
  );
}
