"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MaterialIcon } from "./MaterialIcon";

export interface TrelloCard {
  id: string;
  title: string;
  description: string;
  columnId: "backlog" | "in_progress" | "review" | "done";
  assignees: { name: string; avatar: string; color: string; roleNotice?: string }[];
  tags: { label: string; bg: string; text: string }[];
  checklist: { id: string; text: string; completed: boolean }[];
  dueDate?: string;
  attachmentsCount?: number;
  featuredNotice?: string;
}

const INITIAL_CARDS: TrelloCard[] = [
  {
    id: "card-crm",
    title: "Proyecto CRM Corporativo Deinsa",
    description:
      "Diseño y construcción integral del sistema de CRM interno de Deinsa Global para gestión de clientes, prospectos comerciales, pipeline de ventas y analítica comercial.",
    columnId: "in_progress",
    assignees: [
      {
        name: "Mariano",
        avatar: "M",
        color: "bg-blue-600",
        roleNotice: "Mariano está ocupado en el proyecto CRM",
      },
    ],
    tags: [
      { label: "CRM", bg: "bg-blue-100", text: "text-blue-800" },
      { label: "Node.js / Express", bg: "bg-emerald-100", text: "text-emerald-800" },
      { label: "Supabase PostgreSQL", bg: "bg-teal-100", text: "text-teal-800" },
      { label: "Prioridad Alta", bg: "bg-rose-100", text: "text-rose-800" },
    ],
    checklist: [
      { id: "c1", text: "Modelado relacional de clientes, contactos y oportunidades", completed: true },
      { id: "c2", text: "API REST en Express con middlewares de autenticación", completed: true },
      { id: "c3", text: "Pipeline visual de estados de venta tipo Kanban", completed: true },
      { id: "c4", text: "Integración con Webhooks para captura automática de prospectos", completed: true },
      { id: "c5", text: "Filtros dinámicos por agente comercial y fecha", completed: true },
      { id: "c6", text: "Panel de analítica y métricas de conversión", completed: false },
      { id: "c7", text: "Pruebas de estrés y seguridad en staging", completed: false },
    ],
    dueDate: "28 Nov 2026",
    attachmentsCount: 4,
    featuredNotice: "Mariano ocupado actualmente en el desarrollo del CRM",
  },
  {
    id: "card-onboarding",
    title: "Plataforma de Control de Pasantes (Sistema de Aprendizaje)",
    description:
      "Desarrollo integral del sistema de onboarding técnico para pasantes de Deinsa Global: 8 módulos progresivos, masterclasses en video de YouTube, sistema de insignias oficiales, autenticación Firebase y certificación final.",
    columnId: "in_progress",
    assignees: [
      {
        name: "Valentina",
        avatar: "V",
        color: "bg-orange-500",
        roleNotice: "Valentina en la creación de la plataforma de aprendizaje",
      },
      {
        name: "Kevin",
        avatar: "K",
        color: "bg-purple-600",
        roleNotice: "Kevin en la creación de la plataforma de aprendizaje",
      },
    ],
    tags: [
      { label: "Plataforma Onboarding", bg: "bg-orange-100", text: "text-orange-800" },
      { label: "Next.js 16", bg: "bg-neutral-800", text: "text-white" },
      { label: "Firebase Auth", bg: "bg-amber-100", text: "text-amber-800" },
      { label: "En Producción", bg: "bg-emerald-100", text: "text-emerald-800" },
    ],
    checklist: [
      { id: "o1", text: "Arquitectura en Next.js 16 App Router con TypeScript estricto", completed: true },
      { id: "o2", text: "8 módulos técnicos progresivos con bloqueo secuencial", completed: true },
      { id: "o3", text: "Paso 3 con reproductor responsive de Masterclass en YouTube", completed: true },
      { id: "o4", text: "Sistema de Insignias oficiales con logos vectoriales para cada módulo", completed: true },
      { id: "o5", text: "Conexión a Firebase Auth y SDK configurado", completed: true },
      { id: "o6", text: "Cuenta secreta de supervisión R&D (ingenieros2026@gmail.com)", completed: true },
      { id: "o7", text: "Certificado final descargable con ID único criptográfico", completed: true },
      { id: "o8", text: "Tablero Trello interactivo para control de proyectos en creación", completed: true },
      { id: "o9", text: "Ecosistema interactivo de universos tecnológicos interactivo con el ratón", completed: true },
    ],
    dueDate: "23 Nov 2026",
    attachmentsCount: 8,
    featuredNotice: "Valentina y Kevin en la creación de la plataforma de aprendizaje",
  },
  {
    id: "card-gemini-ai",
    title: "Agente Evaluador de Código con Gemini Studio",
    description:
      "Integración de Route Handler seguro en Next.js comunicándose con Google Gemini API para proporcionar retroalimentación técnica automática y privada a los pasantes.",
    columnId: "review",
    assignees: [
      { name: "Valentina", avatar: "V", color: "bg-orange-500" },
      { name: "Kevin", avatar: "K", color: "bg-purple-600" },
    ],
    tags: [
      { label: "IA Generativa", bg: "bg-amber-100", text: "text-amber-800" },
      { label: "Gemini API", bg: "bg-sky-100", text: "text-sky-800" },
    ],
    checklist: [
      { id: "g1", text: "Diseño de prompt estructurado con System Instructions en AI Studio", completed: true },
      { id: "g2", text: "Endpoint seguro en /api/gemini con protección de API Key", completed: true },
      { id: "g3", text: "Validación de esquema JSON en respuestas generadas", completed: false },
    ],
    dueDate: "30 Nov 2026",
    attachmentsCount: 2,
  },
  {
    id: "card-n8n-slack",
    title: "Flujo de Notificaciones y Webhooks con n8n & Slack",
    description:
      "Microservicio en n8n que dispara alertas en el canal de R&D cuando un pasante finaliza un módulo o emite un certificado.",
    columnId: "review",
    assignees: [
      { name: "Mariano", avatar: "M", color: "bg-blue-600" },
      { name: "Kevin", avatar: "K", color: "bg-purple-600" },
    ],
    tags: [
      { label: "n8n", bg: "bg-orange-100", text: "text-orange-800" },
      { label: "Webhooks", bg: "bg-indigo-100", text: "text-indigo-800" },
    ],
    checklist: [
      { id: "n1", text: "Webhook receiver con nodo IF para filtrar eventos válidos", completed: true },
      { id: "n2", text: "Plantilla enriquecida de mensaje Slack con botones de acción", completed: true },
    ],
    dueDate: "02 Dic 2026",
    attachmentsCount: 1,
  },
  {
    id: "card-gamification",
    title: "Módulo de Gamificación Avanzada & Ranking Semanal",
    description:
      "Propuesta de tablero de posiciones y medallas adicionales por resolución de retos técnicos en tiempo récord para fomentar el compañerismo.",
    columnId: "backlog",
    assignees: [
      { name: "Mariano", avatar: "M", color: "bg-blue-600" },
      { name: "Valentina", avatar: "V", color: "bg-orange-500" },
    ],
    tags: [
      { label: "Gamificación", bg: "bg-purple-100", text: "text-purple-800" },
      { label: "Propuesta R&D", bg: "bg-neutral-100", text: "text-neutral-700" },
    ],
    checklist: [
      { id: "gm1", text: "Definir tabla leaderboard en Supabase", completed: false },
      { id: "gm2", text: "Componente de podio animado con badges", completed: false },
    ],
    dueDate: "10 Dic 2026",
  },
  {
    id: "card-git-flow",
    title: "Arquitectura Git Flow y Políticas de Branching",
    description:
      "Estandarización del flujo de ramas (dev, ramas individuales por pasante) y convención semántica de commits para evitar conflictos de código.",
    columnId: "done",
    assignees: [
      { name: "Mariano", avatar: "M", color: "bg-blue-600" },
      { name: "Valentina", avatar: "V", color: "bg-orange-500" },
      { name: "Kevin", avatar: "K", color: "bg-purple-600" },
    ],
    tags: [
      { label: "GitHub", bg: "bg-neutral-800", text: "text-white" },
      { label: "Completado", bg: "bg-emerald-100", text: "text-emerald-800" },
    ],
    checklist: [
      { id: "gf1", text: "Definición de rama dev como tronco de integración", completed: true },
      { id: "gf2", text: "Plantilla de Pull Request con checklist obligatoria", completed: true },
      { id: "gf3", text: "Aprobación de Pull Request #3 mergeado exitosamente", completed: true },
    ],
    dueDate: "20 Nov 2026",
  },
];

const COLUMNS = [
  { id: "backlog", title: "Ideas y Backlog", icon: "lightbulb", color: "border-sky-300 text-sky-800" },
  { id: "in_progress", title: "En Desarrollo / Proyectos Activos", icon: "engineering", color: "border-amber-300 text-amber-800" },
  { id: "review", title: "En Revisión Técnica / QA", icon: "rate_review", color: "border-purple-300 text-purple-800" },
  { id: "done", title: "Completados / Entregados", icon: "task_alt", color: "border-emerald-300 text-emerald-800" },
];

export function TrelloBoardView() {
  const [cards, setCards] = useState<TrelloCard[]>(INITIAL_CARDS);
  const [memberFilter, setMemberFilter] = useState<string>("ALL");
  const [selectedCard, setSelectedCard] = useState<TrelloCard | null>(null);

  // Estados de Drag & Drop
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const [dragOverColId, setDragOverColId] = useState<string | null>(null);

  // Estados para Modal de Creación Completa de Tarjeta
  const [createModalCol, setCreateModalCol] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newChecklistItems, setNewChecklistItems] = useState<string[]>([]);
  const [currentTaskInput, setCurrentTaskInput] = useState("");
  const [newAssigneeType, setNewAssigneeType] = useState<"VALENTINA_KEVIN" | "MARIANO" | "ALL">("VALENTINA_KEVIN");
  const [newTagLabel, setNewTagLabel] = useState("R&D");

  // Estados para Edición dentro del Modal de Detalle
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitleVal, setEditTitleVal] = useState("");
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [editDescVal, setEditDescVal] = useState("");
  const [modalNewTaskText, setModalNewTaskText] = useState("");
  const [confirmDeleteCard, setConfirmDeleteCard] = useState(false);

  // Filtrado de tarjetas
  const filteredCards = cards.filter((card) => {
    if (memberFilter === "ALL") return true;
    if (memberFilter === "MARIANO") {
      return card.assignees.some((a) => a.name === "Mariano");
    }
    if (memberFilter === "VALENTINA_KEVIN") {
      return card.assignees.some((a) => a.name === "Valentina" || a.name === "Kevin");
    }
    return true;
  });

  // Movimiento de tarjeta (cambio de columna)
  function handleMoveCard(cardId: string, nextColId: "backlog" | "in_progress" | "review" | "done") {
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, columnId: nextColId } : c))
    );
    if (selectedCard?.id === cardId) {
      setSelectedCard((prev) => (prev ? { ...prev, columnId: nextColId } : null));
    }
  }

  // Drag and Drop Handlers
  function handleDragStart(e: React.DragEvent, cardId: string) {
    e.dataTransfer.setData("text/plain", cardId);
    e.dataTransfer.effectAllowed = "move";
    setDraggedCardId(cardId);
  }

  function handleDragOver(e: React.DragEvent, colId: string) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverColId !== colId) {
      setDragOverColId(colId);
    }
  }

  function handleDragLeave(e: React.DragEvent, colId: string) {
    // Si el puntero aún está dentro del contenedor, no resetear
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    if (dragOverColId === colId) {
      setDragOverColId(null);
    }
  }

  function handleDrop(e: React.DragEvent, colId: "backlog" | "in_progress" | "review" | "done") {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("text/plain") || draggedCardId;
    if (cardId) {
      handleMoveCard(cardId, colId);
    }
    setDraggedCardId(null);
    setDragOverColId(null);
  }

  // Apertura del modal de creación
  function openCreateModal(columnId: string) {
    setCreateModalCol(columnId);
    setNewTitle("");
    setNewDescription("");
    setNewChecklistItems([]);
    setCurrentTaskInput("");
    setNewAssigneeType("VALENTINA_KEVIN");
    setNewTagLabel("R&D");
  }

  // Añadir ítem a la checklist de la nueva tarjeta
  function handleAddChecklistItemToNewCard() {
    if (!currentTaskInput.trim()) return;
    setNewChecklistItems((prev) => [...prev, currentTaskInput.trim()]);
    setCurrentTaskInput("");
  }

  function handleRemoveChecklistItemFromNewCard(index: number) {
    setNewChecklistItems((prev) => prev.filter((_, i) => i !== index));
  }

  // Guardar nueva tarjeta creada
  function handleSaveNewCard() {
    if (!newTitle.trim() || !createModalCol) return;

    let assigneesList: TrelloCard["assignees"] = [
      { name: "Valentina", avatar: "V", color: "bg-orange-500" },
      { name: "Kevin", avatar: "K", color: "bg-purple-600" },
    ];

    if (newAssigneeType === "MARIANO") {
      assigneesList = [{ name: "Mariano", avatar: "M", color: "bg-blue-600" }];
    } else if (newAssigneeType === "ALL") {
      assigneesList = [
        { name: "Mariano", avatar: "M", color: "bg-blue-600" },
        { name: "Valentina", avatar: "V", color: "bg-orange-500" },
        { name: "Kevin", avatar: "K", color: "bg-purple-600" },
      ];
    }

    const newCard: TrelloCard = {
      id: `card-${Date.now()}`,
      title: newTitle.trim(),
      description:
        newDescription.trim() ||
        "Especificación técnica y entregables para esta iniciativa en desarrollo.",
      columnId: createModalCol as any,
      assignees: assigneesList,
      tags: [
        {
          label: newTagLabel,
          bg: newTagLabel === "Prioridad Alta" ? "bg-rose-100" : "bg-orange-100",
          text: newTagLabel === "Prioridad Alta" ? "text-rose-800" : "text-orange-800",
        },
      ],
      checklist: newChecklistItems.map((text, idx) => ({
        id: `task-${Date.now()}-${idx}`,
        text,
        completed: false,
      })),
      dueDate: "30 Nov 2026",
      attachmentsCount: 1,
    };

    setCards((prev) => [newCard, ...prev]);
    setCreateModalCol(null);
  }

  // Toggle de tarea en tarjeta
  function handleToggleChecklistItem(cardId: string, itemId: string) {
    setCards((prev) =>
      prev.map((c) => {
        if (c.id !== cardId) return c;
        const updatedChecklist = c.checklist.map((item) =>
          item.id === itemId ? { ...item, completed: !item.completed } : item
        );
        const updatedCard = { ...c, checklist: updatedChecklist };
        if (selectedCard?.id === cardId) setSelectedCard(updatedCard);
        return updatedCard;
      })
    );
  }

  // Abrir modal de detalle y sincronizar valores de edición
  function handleOpenCardModal(card: TrelloCard) {
    setSelectedCard(card);
    setIsEditingTitle(false);
    setEditTitleVal(card.title);
    setIsEditingDesc(false);
    setEditDescVal(card.description);
    setModalNewTaskText("");
    setConfirmDeleteCard(false);
  }

  // Guardar edición de Título
  function handleSaveCardTitle() {
    if (!selectedCard || !editTitleVal.trim()) return;
    const updatedTitle = editTitleVal.trim();
    setCards((prev) =>
      prev.map((c) => (c.id === selectedCard.id ? { ...c, title: updatedTitle } : c))
    );
    setSelectedCard((prev) => (prev ? { ...prev, title: updatedTitle } : null));
    setIsEditingTitle(false);
  }

  // Guardar edición de Descripción
  function handleSaveCardDesc() {
    if (!selectedCard) return;
    const updatedDesc = editDescVal.trim();
    setCards((prev) =>
      prev.map((c) => (c.id === selectedCard.id ? { ...c, description: updatedDesc } : c))
    );
    setSelectedCard((prev) => (prev ? { ...prev, description: updatedDesc } : null));
    setIsEditingDesc(false);
  }

  // Añadir tarea a la checklist en el modal de detalle
  function handleAddChecklistItemToSelectedCard() {
    if (!selectedCard || !modalNewTaskText.trim()) return;
    const newTask = {
      id: `task-${Date.now()}`,
      text: modalNewTaskText.trim(),
      completed: false,
    };

    const updatedChecklist = [...selectedCard.checklist, newTask];
    setCards((prev) =>
      prev.map((c) =>
        c.id === selectedCard.id ? { ...c, checklist: updatedChecklist } : c
      )
    );
    setSelectedCard((prev) =>
      prev ? { ...prev, checklist: updatedChecklist } : null
    );
    setModalNewTaskText("");
  }

  // Eliminar tarea de la checklist en el modal de detalle
  function handleDeleteChecklistItem(itemId: string) {
    if (!selectedCard) return;
    const updatedChecklist = selectedCard.checklist.filter((i) => i.id !== itemId);
    setCards((prev) =>
      prev.map((c) =>
        c.id === selectedCard.id ? { ...c, checklist: updatedChecklist } : c
      )
    );
    setSelectedCard((prev) =>
      prev ? { ...prev, checklist: updatedChecklist } : null
    );
  }

  // Eliminar tarjeta completa
  function handleDeleteCard(cardId: string) {
    setCards((prev) => prev.filter((c) => c.id !== cardId));
    setSelectedCard(null);
    setConfirmDeleteCard(false);
  }

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Cabecera del Tablero estilo Trello */}
      <header className="rounded-3xl border border-[#EAE5DB] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F05A28] text-white shadow-sm">
                <MaterialIcon name="view_kanban" size={20} filled />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#F05A28]">
                Tablero Oficial de Proyectos R&amp;D
              </span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#121316]">
              Plataforma Sistema Control Pasantes
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#6C707A] max-w-2xl">
              Inspirado en el tablero de{" "}
              <a
                href="https://trello.com/b/9OdPUBss/plataforma-sistema-control-pasantes"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#F05A28] underline hover:text-[#E04D1B]"
              >
                Trello Oficial de Deinsa Global
              </a>
              . Arrastra las tarjetas entre columnas, gestiona tareas, edita descripciones y supervisa asignaciones activas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-bold text-[#6C707A]">Filtrar por asignación:</span>
            <button
              type="button"
              onClick={() => setMemberFilter("ALL")}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                memberFilter === "ALL"
                  ? "bg-[#121316] text-white shadow-sm"
                  : "border border-[#EAE5DB] bg-white text-neutral-600 hover:bg-[#FAF7F2]"
              }`}
            >
              Todos ({cards.length})
            </button>
            <button
              type="button"
              onClick={() => setMemberFilter("MARIANO")}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                memberFilter === "MARIANO"
                  ? "bg-blue-600 text-white shadow-sm ring-2 ring-blue-300"
                  : "border border-blue-200 bg-blue-50/60 text-blue-800 hover:bg-blue-100/60"
              }`}
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-700 text-white text-[10px]">M</span>
              Mariano (CRM)
            </button>
            <button
              type="button"
              onClick={() => setMemberFilter("VALENTINA_KEVIN")}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                memberFilter === "VALENTINA_KEVIN"
                  ? "bg-[#F05A28] text-white shadow-sm ring-2 ring-[#F05A28]/30"
                  : "border border-[#F05A28]/30 bg-[#F05A28]/10 text-[#F05A28] hover:bg-[#F05A28]/20"
              }`}
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#E04D1B] text-white text-[10px]">V+K</span>
              Valentina y Kevin (Plataforma)
            </button>
          </div>
        </div>

        {/* Resumen de Asignaciones Destacadas */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 border-t border-[#EAE5DB] pt-4">
          <div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/40 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-sm">
              M
            </div>
            <div className="min-w-0">
              <span className="block text-[11px] font-bold text-blue-900 truncate">
                Mariano · Asignación Activa
              </span>
              <p className="text-xs font-semibold text-blue-700 truncate">
                Ocupado en el proyecto CRM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[#F05A28]/20 bg-[#F05A28]/5 p-3 sm:col-span-1 lg:col-span-2">
            <div className="flex -space-x-2 shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F05A28] font-bold text-white shadow-sm ring-2 ring-white">
                V
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 font-bold text-white shadow-sm ring-2 ring-white">
                K
              </div>
            </div>
            <div className="min-w-0">
              <span className="block text-[11px] font-bold text-[#F05A28] truncate">
                Valentina y Kevin · Asignación Activa
              </span>
              <p className="text-xs font-semibold text-neutral-700 truncate">
                En la creación de la plataforma de aprendizaje (Onboarding)
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Tablero Kanban con Columnas y Drag and Drop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
        {COLUMNS.map((col) => {
          const colCards = filteredCards.filter((c) => c.columnId === col.id);
          const isOverThisCol = dragOverColId === col.id;

          return (
            <div
              key={col.id}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDragLeave={(e) => handleDragLeave(e, col.id)}
              onDrop={(e) => handleDrop(e, col.id as any)}
              className={`rounded-3xl border p-4 flex flex-col gap-3 min-h-[540px] transition-all duration-200 ${
                isOverThisCol
                  ? "border-[#F05A28] bg-[#F05A28]/10 ring-2 ring-[#F05A28]/50 shadow-lg scale-[1.01]"
                  : "border-[#EAE5DB] bg-[#F5F1EA]/60"
              }`}
            >
              {/* Encabezado de Columna */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <MaterialIcon name={col.icon} size={18} className="text-neutral-500" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                    {col.title}
                  </h3>
                </div>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-200 text-[11px] font-bold text-neutral-700">
                  {colCards.length}
                </span>
              </div>

              {/* Botón para abrir el formulario completo de añadir tarjeta */}
              <button
                type="button"
                onClick={() => openCreateModal(col.id)}
                className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border border-dashed border-neutral-300 bg-white/70 text-xs font-bold text-neutral-600 hover:border-orange-400 hover:text-orange-600 hover:bg-white transition-all cursor-pointer shadow-2xs"
              >
                <MaterialIcon name="add" size={16} />
                <span>Añadir tarjeta con tareas</span>
              </button>

              {/* Zona receptora visual si se está arrastrando */}
              {isOverThisCol && (
                <div className="rounded-2xl border-2 border-dashed border-orange-400 bg-orange-100/50 p-3 text-center text-xs font-bold text-orange-700 animate-pulse">
                  Soltar tarjeta aquí para mover a {col.title}
                </div>
              )}

              {/* Lista de Tarjetas con soporte Draggable */}
              <div className="space-y-3 flex-1">
                {colCards.map((card) => {
                  const completedTasks = card.checklist.filter((i) => i.completed).length;
                  const totalTasks = card.checklist.length;
                  const percent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
                  const isBeingDragged = draggedCardId === card.id;

                  return (
                    <article
                      key={card.id}
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, card.id)}
                      onDragEnd={() => {
                        setDraggedCardId(null);
                        setDragOverColId(null);
                      }}
                      onClick={() => handleOpenCardModal(card)}
                      className={`group cursor-grab active:cursor-grabbing rounded-2xl border bg-white p-4 shadow-sm transition-all hover:border-orange-300 hover:shadow-md ${
                        isBeingDragged
                          ? "opacity-40 scale-95 border-dashed border-orange-500 shadow-xl"
                          : "border-neutral-200/90"
                      }`}
                    >
                      {/* Manija de arrastre y etiqueta superior */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {card.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${tag.bg} ${tag.text}`}
                            >
                              {tag.label}
                            </span>
                          ))}
                        </div>
                        <span
                          className="opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-neutral-600 transition-opacity"
                          title="Arrastrar tarjeta a otra columna"
                        >
                          <MaterialIcon name="drag_indicator" size={16} />
                        </span>
                      </div>

                      {/* Aviso especial destacado si lo tiene */}
                      {card.featuredNotice && (
                        <div className="mb-2.5 rounded-lg bg-orange-50 border border-orange-200/80 px-2.5 py-1 text-[11px] font-bold text-orange-800 flex items-center gap-1.5">
                          <MaterialIcon name="push_pin" size={14} className="text-orange-600" />
                          <span>{card.featuredNotice}</span>
                        </div>
                      )}

                      {/* Título de la tarjeta */}
                      <h4 className="text-sm font-bold text-neutral-900 group-hover:text-orange-600 transition-colors leading-snug">
                        {card.title}
                      </h4>

                      <p className="mt-1 text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                        {card.description}
                      </p>

                      {/* Progreso de la checklist */}
                      {totalTasks > 0 && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-500 mb-1">
                            <span className="flex items-center gap-1">
                              <MaterialIcon name="check_box" size={13} className="text-emerald-600" />
                              {completedTasks}/{totalTasks} tareas
                            </span>
                            <span>{percent}%</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-neutral-100 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${
                                percent === 100 ? "bg-emerald-500" : "bg-orange-500"
                              }`}
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Pie de tarjeta: Avatares y Fecha */}
                      <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-2.5">
                        <div className="flex -space-x-1.5">
                          {card.assignees.map((assignee, aIdx) => (
                            <div
                              key={aIdx}
                              title={assignee.name}
                              className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-extrabold text-white ring-2 ring-white shadow-sm ${assignee.color}`}
                            >
                              {assignee.avatar}
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 text-[11px] font-semibold text-neutral-400">
                          {card.dueDate && (
                            <span className="flex items-center gap-1">
                              <MaterialIcon name="event" size={13} />
                              {card.dueDate}
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL 1: Crear Nueva Tarjeta Completa con Título, Descripción y Tareas */}
      {createModalCol && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/60 backdrop-blur-sm p-4 overflow-y-auto"
        >
          <div className="relative w-full max-w-xl rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-2xl animate-scale-up">
            <button
              type="button"
              onClick={() => setCreateModalCol(null)}
              className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 hover:bg-neutral-200 cursor-pointer"
            >
              <MaterialIcon name="close" size={18} />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500 text-white shadow-2xs">
                <MaterialIcon name="post_add" size={16} />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                Nueva Tarjeta de Proyecto
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900">
              Crear tarjeta en: {COLUMNS.find((c) => c.id === createModalCol)?.title}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveNewCard();
              }}
              className="mt-5 space-y-4"
            >
              {/* Título */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Título de la tarjeta / reto *
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="Ej. Refactorización de Middleware de Autenticación..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded-xl border border-neutral-300 p-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Descripción técnica
                </label>
                <textarea
                  rows={3}
                  placeholder="Explica detalladamente el objetivo, contexto y requerimientos de esta tarea..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full rounded-xl border border-neutral-300 p-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 resize-none"
                />
              </div>

              {/* Checklist de Tareas */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Lista de Tareas / Entregables ({newChecklistItems.length})
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Escribe una tarea y pulsa Enter o Agregar..."
                    value={currentTaskInput}
                    onChange={(e) => setCurrentTaskInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddChecklistItemToNewCard();
                      }
                    }}
                    className="flex-1 rounded-xl border border-neutral-300 p-2 text-xs text-neutral-900 outline-none focus:border-orange-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddChecklistItemToNewCard}
                    className="rounded-xl bg-orange-500 px-3 py-2 text-xs font-bold text-white hover:bg-orange-600 cursor-pointer shrink-0"
                  >
                    + Agregar
                  </button>
                </div>

                {newChecklistItems.length > 0 && (
                  <div className="space-y-1.5 max-h-36 overflow-y-auto rounded-xl border border-neutral-200 p-2.5 bg-neutral-50/70">
                    {newChecklistItems.map((task, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-2 rounded-lg bg-white p-2 text-xs font-medium text-neutral-800 shadow-2xs border border-neutral-200"
                      >
                        <span className="truncate">{task}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveChecklistItemFromNewCard(idx)}
                          className="text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Eliminar tarea"
                        >
                          <MaterialIcon name="delete" size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Asignación y Tag */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Asignar miembros
                  </label>
                  <select
                    value={newAssigneeType}
                    onChange={(e) => setNewAssigneeType(e.target.value as any)}
                    className="w-full rounded-xl border border-neutral-300 p-2 text-xs font-semibold text-neutral-800 outline-none focus:border-orange-500"
                  >
                    <option value="VALENTINA_KEVIN">Valentina y Kevin (Plataforma)</option>
                    <option value="MARIANO">Mariano (CRM)</option>
                    <option value="ALL">Equipo Completo R&D</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Etiqueta
                  </label>
                  <select
                    value={newTagLabel}
                    onChange={(e) => setNewTagLabel(e.target.value)}
                    className="w-full rounded-xl border border-neutral-300 p-2 text-xs font-semibold text-neutral-800 outline-none focus:border-orange-500"
                  >
                    <option value="R&D">R&D</option>
                    <option value="Prioridad Alta">Prioridad Alta</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="QA / Pruebas">QA / Pruebas</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setCreateModalCol(null)}
                  className="rounded-xl px-4 py-2.5 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-orange-500 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-orange-600 cursor-pointer"
                >
                  Guardar Tarjeta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Detalle y Edición Completa de Tarjeta Existente */}
      {selectedCard && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/60 backdrop-blur-sm p-4 overflow-y-auto"
        >
          <div className="relative w-full max-w-2xl rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-2xl">
            {/* Botón cerrar */}
            <button
              type="button"
              onClick={() => setSelectedCard(null)}
              className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 hover:bg-neutral-200 cursor-pointer"
            >
              <MaterialIcon name="close" size={18} />
            </button>

            {/* Aviso especial destacado */}
            {selectedCard.featuredNotice && (
              <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-bold text-orange-800">
                <MaterialIcon name="stars" size={16} className="text-orange-600" />
                {selectedCard.featuredNotice}
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {selectedCard.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className={`rounded-md px-2.5 py-0.5 text-xs font-bold ${tag.bg} ${tag.text}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>

            {/* Título Editable */}
            <div className="mb-3">
              {isEditingTitle ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editTitleVal}
                    onChange={(e) => setEditTitleVal(e.target.value)}
                    className="w-full text-xl font-extrabold text-neutral-900 border border-orange-400 rounded-xl p-2 outline-none focus:ring-2 focus:ring-orange-100"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleSaveCardTitle}
                      className="rounded-lg bg-orange-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-orange-600 cursor-pointer"
                    >
                      Guardar título
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingTitle(false);
                        setEditTitleVal(selectedCard.title);
                      }}
                      className="rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-3 group">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 leading-snug">
                    {selectedCard.title}
                  </h2>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingTitle(true);
                      setEditTitleVal(selectedCard.title);
                    }}
                    className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 shrink-0 p-1 rounded-lg hover:bg-orange-50 cursor-pointer"
                    title="Editar título de la tarjeta"
                  >
                    <MaterialIcon name="edit" size={15} />
                    <span>Editar</span>
                  </button>
                </div>
              )}
            </div>

            {/* Selector de columna / lista */}
            <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-neutral-600">
              <span>En la columna:</span>
              <select
                value={selectedCard.columnId}
                onChange={(e) => handleMoveCard(selectedCard.id, e.target.value as any)}
                className="rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-bold text-neutral-800 outline-none focus:border-orange-500"
              >
                {COLUMNS.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Asignados */}
            <div className="mt-4 border-t border-neutral-100 pt-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Miembros asignados
              </span>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {selectedCard.assignees.map((a, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-1.5"
                  >
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white ${a.color}`}
                    >
                      {a.avatar}
                    </div>
                    <span className="text-xs font-bold text-neutral-800">{a.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Descripción Editable */}
            <div className="mt-4 border-t border-neutral-100 pt-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Descripción del proyecto
                </span>
                {!isEditingDesc && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingDesc(true);
                      setEditDescVal(selectedCard.description);
                    }}
                    className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 p-1 rounded-lg hover:bg-orange-50 cursor-pointer"
                  >
                    <MaterialIcon name="edit" size={14} />
                    <span>Modificar</span>
                  </button>
                )}
              </div>

              {isEditingDesc ? (
                <div className="space-y-2">
                  <textarea
                    rows={4}
                    value={editDescVal}
                    onChange={(e) => setEditDescVal(e.target.value)}
                    className="w-full rounded-2xl border border-orange-400 p-3 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-orange-100 resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleSaveCardDesc}
                      className="rounded-lg bg-orange-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-orange-600 cursor-pointer"
                    >
                      Guardar descripción
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingDesc(false);
                        setEditDescVal(selectedCard.description);
                      }}
                      className="rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm leading-relaxed text-neutral-700 bg-neutral-50/70 p-4 rounded-2xl border border-neutral-100">
                  {selectedCard.description}
                </p>
              )}
            </div>

            {/* Checklist interactivo con agregar y eliminar tareas */}
            <div className="mt-5 border-t border-neutral-100 pt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Lista de verificación y entregables ({selectedCard.checklist.filter((i) => i.completed).length} de {selectedCard.checklist.length})
                </span>
              </div>

              {/* Input para agregar nueva tarea a la checklist */}
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Agregar nueva tarea técnica..."
                  value={modalNewTaskText}
                  onChange={(e) => setModalNewTaskText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddChecklistItemToSelectedCard();
                    }
                  }}
                  className="flex-1 rounded-xl border border-neutral-300 p-2 text-xs text-neutral-900 outline-none focus:border-orange-500"
                />
                <button
                  type="button"
                  onClick={handleAddChecklistItemToSelectedCard}
                  className="rounded-xl bg-orange-500 px-3 py-2 text-xs font-bold text-white hover:bg-orange-600 cursor-pointer shrink-0"
                >
                  + Agregar Tarea
                </button>
              </div>

              {/* Lista de tareas */}
              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {selectedCard.checklist.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white p-3 hover:border-orange-300 transition-colors group"
                  >
                    <label className="flex items-start gap-3 flex-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => handleToggleChecklistItem(selectedCard.id, item.id)}
                        className="mt-0.5 h-4 w-4 rounded border-neutral-300 accent-orange-500 cursor-pointer"
                      />
                      <span
                        className={`text-xs sm:text-sm font-medium ${
                          item.completed ? "text-neutral-400 line-through" : "text-neutral-800"
                        }`}
                      >
                        {item.text}
                      </span>
                    </label>

                    <button
                      type="button"
                      onClick={() => handleDeleteChecklistItem(item.id)}
                      className="opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-red-600 transition-opacity p-1 cursor-pointer rounded-lg hover:bg-red-50"
                      title="Eliminar esta tarea"
                    >
                      <MaterialIcon name="delete" size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Acciones del pie del modal: Eliminar Tarjeta y Cerrar */}
            <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4">
              <div>
                {confirmDeleteCard ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-red-600">¿Eliminar tarjeta?</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteCard(selectedCard.id)}
                      className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700 cursor-pointer"
                    >
                      Sí, eliminar
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteCard(false)}
                      className="rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-semibold text-neutral-600 hover:bg-neutral-50 cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmDeleteCard(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    <MaterialIcon name="delete_forever" size={16} />
                    <span>Eliminar tarjeta</span>
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setSelectedCard(null)}
                className="rounded-xl bg-neutral-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-neutral-800 cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
