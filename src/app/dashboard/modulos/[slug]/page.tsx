import React from "react";
import { notFound } from "next/navigation";
import { getModuleBySlug } from "@/src/services/onboardingModules";
import { ModuleDetailView } from "@/src/components/dashboard/ModuleDetailView";

interface ModulePageProps {
  params: Promise<{ slug: string }>;
}

export default async function SingleModulePage({ params }: ModulePageProps) {
  const { slug } = await params;
  const mod = getModuleBySlug(slug);

  if (!mod) {
    notFound();
  }

  return <ModuleDetailView module={mod} />;
}
