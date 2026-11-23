import React from "react";
import type { Metadata } from "next";
import { TrelloBoardView } from "@/src/components/dashboard/TrelloBoardView";

export const metadata: Metadata = {
  title: "Tablero Trello de Proyectos | Deinsa Global R&D",
  description: "Seguimiento de proyectos en creación: CRM, Plataforma de Aprendizaje y asignaciones de pasantes.",
};

export default function ProyectosPage() {
  return <TrelloBoardView />;
}
