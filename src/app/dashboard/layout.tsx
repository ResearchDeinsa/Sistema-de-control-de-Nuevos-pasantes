import React from "react";
import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { getCurrentUserProfile } from "@/src/actions/profile";
import { DashboardProvider } from "@/src/components/dashboard/DashboardProvider";
import { DashboardShell } from "@/src/components/dashboard/DashboardShell";
import "./dashboard.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dashboard-sans",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dashboard-mono",
  display: "swap",
});

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
    <div
      className={`${plusJakartaSans.variable} ${jetBrainsMono.variable} min-h-screen bg-white text-neutral-900`}
    >
      <DashboardProvider initialProfile={profile} authenticated={authenticated}>
        <DashboardShell>{children}</DashboardShell>
      </DashboardProvider>
    </div>
  );
}
