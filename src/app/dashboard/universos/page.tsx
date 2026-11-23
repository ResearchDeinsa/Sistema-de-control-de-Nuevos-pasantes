import React from "react";
import type { Metadata } from "next";
import { UniversesEcosystem } from "@/src/components/dashboard/UniversesEcosystem";

export const metadata: Metadata = {
  title: "Ecosistema de Universos Técnicos | Deinsa Global R&D",
  description: "Visualizador interactivo 3D de los universos tecnológicos del onboarding con pistas para evaluaciones y notas clave.",
};

export default function UniversosPage() {
  return <UniversesEcosystem />;
}
