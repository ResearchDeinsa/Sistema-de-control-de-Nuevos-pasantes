export interface ModuleBadgeData {
  moduleId: string;
  slug: string;
  technology: string;
  badgeName: string;
  category: string;
  accentColor: string;
  glowColor: string;
  description: string;
  youtubeId: string;
  youtubeUrl: string;
  videoTitle: string;
  videoDuration: string;
  instructor: string;
  criteria: string;
}

export const MODULE_BADGES: Record<string, ModuleBadgeData> = {
  "mod-1-github": {
    moduleId: "mod-1-github",
    slug: "github",
    technology: "GitHub",
    badgeName: "Insignia Oficial GitHub R&D",
    category: "Control de Versiones",
    accentColor: "#24292F",
    glowColor: "rgba(36, 41, 47, 0.35)",
    description: "Dominio de control de versiones, flujo de ramas (branching), commits atómicos y Pull Requests colaborativos.",
    youtubeId: "RGOj5yH7evk",
    youtubeUrl: "https://www.youtube.com/embed/RGOj5yH7evk",
    videoTitle: "Masterclass: Git y GitHub desde Cero para Equipos de Desarrollo",
    videoDuration: "28 min",
    instructor: "Academia Técnica R&D",
    criteria: "Lecciones completadas + Masterclass vista + Quiz 3/3 aprobado",
  },
  "mod-2-react-nextjs": {
    moduleId: "mod-2-react-nextjs",
    slug: "react-nextjs",
    technology: "React / Next.js",
    badgeName: "Insignia Oficial Next.js & TypeScript",
    category: "Frontend Moderno",
    accentColor: "#0284C7",
    glowColor: "rgba(2, 132, 199, 0.35)",
    description: "Arquitectura frontend con Next.js App Router, componentes tipados con TypeScript y consumo eficiente de APIs.",
    youtubeId: "Sklc_fQBmcs",
    youtubeUrl: "https://www.youtube.com/embed/Sklc_fQBmcs",
    videoTitle: "Masterclass: Next.js App Router, Server Components y TypeScript",
    videoDuration: "35 min",
    instructor: "Academia Técnica R&D",
    criteria: "Lecciones completadas + Masterclass vista + Quiz 3/3 aprobado",
  },
  "mod-3-nodejs-express": {
    moduleId: "mod-3-nodejs-express",
    slug: "nodejs-express",
    technology: "Node.js / Express",
    badgeName: "Insignia Oficial Node.js Backend",
    category: "Desarrollo Backend",
    accentColor: "#16A34A",
    glowColor: "rgba(22, 163, 74, 0.35)",
    description: "Construcción de APIs REST escalables, middlewares de seguridad, controladores desacoplados y códigos HTTP estándar.",
    youtubeId: "1hpc70_OoAg",
    youtubeUrl: "https://www.youtube.com/embed/1hpc70_OoAg",
    videoTitle: "Masterclass: Creación de API REST Profesional con Node.js y Express",
    videoDuration: "30 min",
    instructor: "Academia Técnica R&D",
    criteria: "Lecciones completadas + Masterclass vista + Quiz 3/3 aprobado",
  },
  "mod-4-supabase-firebase": {
    moduleId: "mod-4-supabase-firebase",
    slug: "supabase-firebase",
    technology: "Supabase / Firebase",
    badgeName: "Insignia Oficial Cloud & RLS",
    category: "Datos y Seguridad",
    accentColor: "#059669",
    glowColor: "rgba(5, 150, 105, 0.35)",
    description: "Gestión de bases de datos relacionales y NoSQL, autenticación con Firebase/Supabase y políticas Row Level Security (RLS).",
    youtubeId: "7uKQBl9uZ00",
    youtubeUrl: "https://www.youtube.com/embed/7uKQBl9uZ00",
    videoTitle: "Masterclass: Supabase & Firebase: Auth, CRUD y Reglas RLS",
    videoDuration: "32 min",
    instructor: "Academia Técnica R&D",
    criteria: "Lecciones completadas + Masterclass vista + Quiz 3/3 aprobado",
  },
  "mod-5-notion": {
    moduleId: "mod-5-notion",
    slug: "notion",
    technology: "Notion",
    badgeName: "Insignia Oficial Notion Architect",
    category: "Productividad y Docs",
    accentColor: "#475569",
    glowColor: "rgba(71, 85, 105, 0.35)",
    description: "Estructuración ágil de proyectos, bases de datos vinculadas, documentación técnica clara y plantillas reutilizables.",
    youtubeId: "0oxv5Z0i2Xk",
    youtubeUrl: "https://www.youtube.com/embed/0oxv5Z0i2Xk",
    videoTitle: "Masterclass: Organización de Proyectos y Documentación Técnica en Notion",
    videoDuration: "20 min",
    instructor: "Academia Técnica R&D",
    criteria: "Lecciones completadas + Masterclass vista + Quiz 3/3 aprobado",
  },
  "mod-6-make": {
    moduleId: "mod-6-make",
    slug: "make",
    technology: "Make",
    badgeName: "Insignia Oficial Make Specialist",
    category: "Automatización No-Code",
    accentColor: "#7C3AED",
    glowColor: "rgba(124, 58, 237, 0.35)",
    description: "Diseño de escenarios integrados sin código, webhooks instantáneos, enrutamiento condicional y optimización de operaciones.",
    youtubeId: "pEwWv2P4D4E",
    youtubeUrl: "https://www.youtube.com/embed/pEwWv2P4D4E",
    videoTitle: "Masterclass: Integraciones y Automatizaciones Avanzadas con Make",
    videoDuration: "25 min",
    instructor: "Academia Técnica R&D",
    criteria: "Lecciones completadas + Masterclass vista + Quiz 3/3 aprobado",
  },
  "mod-7-n8n": {
    moduleId: "mod-7-n8n",
    slug: "n8n",
    technology: "n8n",
    badgeName: "Insignia Oficial n8n Workflow Master",
    category: "Flujos y Webhooks",
    accentColor: "#EA580C",
    glowColor: "rgba(234, 88, 12, 0.35)",
    description: "Construcción de flujos auto-hospedados, transformaciones complejas con nodos Code/Set, llamadas HTTP y microservicios.",
    youtubeId: "1v0p3F8w2cM",
    youtubeUrl: "https://www.youtube.com/embed/1v0p3F8w2cM",
    videoTitle: "Masterclass: Automatización de Flujos y Webhooks con n8n",
    videoDuration: "30 min",
    instructor: "Academia Técnica R&D",
    criteria: "Lecciones completadas + Masterclass vista + Quiz 3/3 aprobado",
  },
  "mod-8-ia-gemini": {
    moduleId: "mod-8-ia-gemini",
    slug: "ia-gemini-studio",
    technology: "IA (Gemini Studio)",
    badgeName: "Insignia Oficial Google Gemini AI",
    category: "Inteligencia Artificial",
    accentColor: "#D97706",
    glowColor: "rgba(217, 119, 6, 0.35)",
    description: "Ingeniería de prompts estructurada, System Instructions, llamadas backend seguras con Gemini API y evaluación responsable.",
    youtubeId: "0L_bC5QO8rI",
    youtubeUrl: "https://www.youtube.com/embed/0L_bC5QO8rI",
    videoTitle: "Masterclass: Google Gemini Studio & AI API para Desarrolladores",
    videoDuration: "35 min",
    instructor: "Academia Técnica R&D",
    criteria: "Lecciones completadas + Masterclass vista + Quiz 3/3 aprobado",
  },
};

export function getBadgeForModule(moduleId: string): ModuleBadgeData | undefined {
  return MODULE_BADGES[moduleId];
}
