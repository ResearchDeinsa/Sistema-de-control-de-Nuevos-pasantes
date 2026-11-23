export interface UniverseNode {
  id: string;
  moduleId: string;
  slug: string;
  technology: string;
  codename: string;
  subtitle: string;
  category: "Core" | "Frontend" | "Backend" | "Cloud" | "Productividad" | "Automatización" | "IA";
  orbitRadius: number; // Radio de órbita visual
  color: string;
  gradient: string;
  glow: string;
  size: number;
  x: number; // Porcentaje relativo X
  y: number; // Porcentaje relativo Y
  coreNotes: string[];
  quizHints: {
    questionRef: string;
    hint: string;
  }[];
  proTip: string;
  secretCommand?: string;
}

export const UNIVERSES_DATA: UniverseNode[] = [
  {
    id: "univ-github",
    moduleId: "mod-1-github",
    slug: "github",
    technology: "GitHub",
    codename: "Sector Git-Prime",
    subtitle: "El Núcleo de Versionado y Flujo de Ramas",
    category: "Core",
    orbitRadius: 180,
    color: "#24292F",
    gradient: "from-zinc-900 via-neutral-800 to-black",
    glow: "rgba(36, 41, 47, 0.6)",
    size: 76,
    x: 18,
    y: 25,
    coreNotes: [
      "Las tres zonas de Git: Directorio de Trabajo -> Staging Area (git add) -> Repositorio Local (git commit).",
      "Cada funcionalidad se desarrolla en una rama aislada (git checkout -b feat/mi-modulo) para nunca tocar dev ni main directamente.",
      "Antes de abrir Pull Request, sincroniza los últimos cambios de dev con git fetch y git merge origin/dev.",
    ],
    quizHints: [
      {
        questionRef: "¿Objetivo principal de trabajar en ramas separadas?",
        hint: "Pista clave: La respuesta correcta se enfoca en aislar el trabajo en progreso para revisión de código sin romper la rama principal.",
      },
      {
        questionRef: "¿Qué comando pasa archivos al staging area?",
        hint: "Pista clave: Recuerda que 'git add <ruta>' prepara los archivos; 'git commit' los registra.",
      },
      {
        questionRef: "¿Qué debe contener un buen Pull Request?",
        hint: "Pista clave: Nunca envíes archivos .env. Un buen PR explica qué se hizo, por qué y cómo probarlo.",
      },
    ],
    proTip: "Ejecuta siempre 'git status' antes y después de cada commit. Si ves archivos como .env o carpetas temporales, revisa tu .gitignore de inmediato.",
    secretCommand: "git log --oneline --graph --decorate -n 5",
  },
  {
    id: "univ-react-nextjs",
    moduleId: "mod-2-react-nextjs",
    slug: "react-nextjs",
    technology: "React / Next.js",
    codename: "Galaxia App-Router",
    subtitle: "El Hiperespacio Frontend con TypeScript",
    category: "Frontend",
    orbitRadius: 240,
    color: "#0284C7",
    gradient: "from-sky-500 via-blue-600 to-indigo-950",
    glow: "rgba(2, 132, 199, 0.7)",
    size: 82,
    x: 42,
    y: 18,
    coreNotes: [
      "Next.js App Router renderiza Server Components por defecto; agrega 'use client' solo si usas hooks (useState, useEffect) o eventos del usuario (onClick, onChange).",
      "Cada carpeta con page.tsx se convierte en una ruta web accesible pública.",
      "En Next.js 16, la propiedad 'params' en rutas dinámicas ([slug]) es una Promise y debe resolverse con await.",
    ],
    quizHints: [
      {
        questionRef: "¿Cuándo agregar 'use client'?",
        hint: "Pista clave: Solo cuando requieras interactividad del navegador o hooks de React (useState, useEffect).",
      },
      {
        questionRef: "¿Qué archivo expone una ruta pública en App Router?",
        hint: "Pista clave: En App Router la convención oficial es 'page.tsx'.",
      },
      {
        questionRef: "¿Por qué tipar las respuestas de fetch con TypeScript?",
        hint: "Pista clave: Detecta errores en tiempo de compilación y ofrece autocompletado seguro de propiedades.",
      },
    ],
    proTip: "Mantén componentes pequeños y desacoplados en src/components/. Si un componente no necesita estado local, déjalo como Server Component para maximizar rendimiento.",
    secretCommand: "npm run build # Valida tipos y SSR con Turbopack",
  },
  {
    id: "univ-nodejs-express",
    moduleId: "mod-3-nodejs-express",
    slug: "nodejs-express",
    technology: "Node.js / Express",
    codename: "Reactor Backend-Core",
    subtitle: "El Núcleo de APIs REST y Middlewares",
    category: "Backend",
    orbitRadius: 210,
    color: "#16A34A",
    gradient: "from-emerald-500 via-green-600 to-zinc-950",
    glow: "rgba(22, 163, 74, 0.7)",
    size: 78,
    x: 68,
    y: 22,
    coreNotes: [
      "Express separa responsabilidades: Rutas (definición de URLs) -> Controladores (manejo de req/res) -> Servicios (lógica pura de negocio y bases de datos).",
      "Los middlewares interceptan y validan peticiones; siempre deben llamar a next() o responder con res.status().json().",
      "Códigos de estado esenciales: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Server Error).",
    ],
    quizHints: [
      {
        questionRef: "¿Qué hace next() en un middleware?",
        hint: "Pista clave: Pasa el control al siguiente middleware o controlador. Si no se llama, la petición queda colgada.",
      },
      {
        questionRef: "¿Código HTTP estándar al crear recurso con POST?",
        hint: "Pista clave: '201 Created' es el estándar oficial cuando un nuevo registro fue creado.",
      },
      {
        questionRef: "¿Por qué separar rutas de controladores?",
        hint: "Pista clave: Modularidad, testabilidad y facilidad de mantenimiento en equipo.",
      },
    ],
    proTip: "Activa express.json() antes de tus rutas para poder leer el cuerpo JSON con req.body sin librerías externas.",
    secretCommand: "curl -i -X POST http://localhost:4000/api/recurso",
  },
  {
    id: "univ-supabase-firebase",
    moduleId: "mod-4-supabase-firebase",
    slug: "supabase-firebase",
    technology: "Supabase / Firebase",
    codename: "Nebulosa Data-Shield",
    subtitle: "El Campo de Fuerza de Datos y Reglas RLS",
    category: "Cloud",
    orbitRadius: 270,
    color: "#059669",
    gradient: "from-teal-400 via-emerald-600 to-slate-950",
    glow: "rgba(5, 150, 105, 0.7)",
    size: 80,
    x: 85,
    y: 45,
    coreNotes: [
      "Row Level Security (RLS) en Supabase / PostgreSQL aplica reglas de acceso directo en el motor de base de datos para cada fila individual.",
      "La función auth.uid() extrae el UUID del usuario autenticado en la sesión actual.",
      "Durante todo el programa de onboarding, las prácticas se realizan siempre en entornos de staging o prueba, jamás contra producción.",
    ],
    quizHints: [
      {
        questionRef: "¿Qué garantiza Row Level Security (RLS)?",
        hint: "Pista clave: Valida a nivel de fila de la base de datos qué registros puede leer o editar cada usuario.",
      },
      {
        questionRef: "¿Función que devuelve el ID del usuario en una política RLS?",
        hint: "Pista clave: Es la función nativa 'auth.uid()'.",
      },
      {
        questionRef: "¿Sobre qué entorno se practican las bases de datos en onboarding?",
        hint: "Pista clave: Siempre en un entorno de staging o sandbox aislado.",
      },
    ],
    proTip: "Activa siempre 'ENABLE ROW LEVEL SECURITY' en tus tablas de PostgreSQL. Sin esta instrucción, cualquier consulta select puede exponer registros de otros pasantes.",
    secretCommand: "ALTER TABLE tu_tabla ENABLE ROW LEVEL SECURITY;",
  },
  {
    id: "univ-notion",
    moduleId: "mod-5-notion",
    slug: "notion",
    technology: "Notion",
    codename: "Torre Ágil de Documentación",
    subtitle: "La Matriz de Arquitectura y Seguimiento",
    category: "Productividad",
    orbitRadius: 190,
    color: "#374151",
    gradient: "from-slate-600 via-neutral-700 to-zinc-950",
    glow: "rgba(71, 85, 105, 0.6)",
    size: 72,
    x: 16,
    y: 70,
    coreNotes: [
      "Las bases de datos en Notion permiten cambiar de vista entre Tabla, Kanban, Calendario y Galería sin duplicar información.",
      "Una buena documentación técnica incluye: Objetivo, Prerrequisitos, Pasos reproducibles, Decisiones técnicas y Evidencia.",
      "Usa plantillas dentro de las bases de datos para estandarizar reportes de avances y minutas de reunión con un clic.",
    ],
    quizHints: [
      {
        questionRef: "¿Ventaja de una base de datos en Notion sobre texto simple?",
        hint: "Pista clave: Permite filtrar, ordenar, usar vista Kanban/Tabla y asignar propiedades estructuradas.",
      },
      {
        questionRef: "¿Elemento indispensable en documentación técnica reutilizable?",
        hint: "Pista clave: Objetivo claro, prerrequisitos, pasos reproducibles y enlaces de referencia.",
      },
      {
        questionRef: "¿Para qué sirven las plantillas de base de datos?",
        hint: "Pista clave: Para estandarizar el formato de nuevas tareas o reportes con un solo clic.",
      },
    ],
    proTip: "Vincula siempre el enlace a tu Pull Request de GitHub en la propiedad de 'Evidencia' de tu tarjeta de Notion para facilitar la revisión de tu mentor.",
    secretCommand: "Shift + Click en Notion para abrir página en vista lateral",
  },
  {
    id: "univ-make",
    moduleId: "mod-6-make",
    slug: "make",
    technology: "Make",
    codename: "Constelación No-Code",
    subtitle: "La Red de Escenarios e Integraciones",
    category: "Automatización",
    orbitRadius: 230,
    color: "#7C3AED",
    gradient: "from-purple-500 via-indigo-600 to-neutral-950",
    glow: "rgba(124, 58, 237, 0.7)",
    size: 76,
    x: 38,
    y: 75,
    coreNotes: [
      "Un escenario en Make se compone de Triggers (disparadores), Filtros, Routers y Acciones.",
      "Los Webhooks reaccionan instantáneamente al recibir un HTTP POST; el polling consulta cada X minutos.",
      "Coloca filtros lo más cerca posible del Trigger para evitar gastar operaciones innecesarias en bundles irrelevantes.",
    ],
    quizHints: [
      {
        questionRef: "¿Para qué sirve un Router en Make?",
        hint: "Pista clave: Divide el flujo en múltiples ramas paralelas o condicionales según filtros.",
      },
      {
        questionRef: "¿Por qué colocar filtros cerca del Trigger?",
        hint: "Pista clave: Para ahorrar operaciones y descartar datos que no cumplen la regla antes de procesarlos.",
      },
      {
        questionRef: "¿Diferencia entre Webhook instantáneo y Polling?",
        hint: "Pista clave: El Webhook recibe el evento en tiempo real; el Polling consulta cada cierto tiempo.",
      },
    ],
    proTip: "Usa el botón 'Run Once' con un payload de prueba antes de activar tu escenario para verificar el mapeo de variables en los bundles de salida.",
    secretCommand: "JSON -> Parse JSON module para estructurar respuestas",
  },
  {
    id: "univ-n8n",
    moduleId: "mod-7-n8n",
    slug: "n8n",
    technology: "n8n",
    codename: "Vórtice Workflow-Engine",
    subtitle: "El Portal de Nodos, Expresiones y Microservicios",
    category: "Automatización",
    orbitRadius: 260,
    color: "#EA580C",
    gradient: "from-orange-500 via-amber-600 to-stone-950",
    glow: "rgba(234, 88, 12, 0.7)",
    size: 80,
    x: 64,
    y: 72,
    coreNotes: [
      "En n8n, cada nodo recibe y emite un arreglo de objetos JSON en el formato { json: { ... } }.",
      "Para acceder a variables dentro de expresiones se usa la sintaxis: {{ $json.campo }}.",
      "La Test URL de un Webhook solo escucha en modo edición; al activar el flujo debes usar la Production URL.",
    ],
    quizHints: [
      {
        questionRef: "¿Diferencia entre Test URL y Production URL en n8n?",
        hint: "Pista clave: La Test URL escucha una sola ejecución en desarrollo; la Production URL opera continuamente.",
      },
      {
        questionRef: "¿Cómo accedes a un campo 'email' en una expresión n8n?",
        hint: "Pista clave: Con la sintaxis de doble llave '{{ $json.email }}'.",
      },
      {
        questionRef: "¿Qué nodo permite conectarse a cualquier API REST?",
        hint: "Pista clave: El nodo 'HTTP Request'.",
      },
    ],
    proTip: "Usa el nodo 'Code' cuando necesites transformar arreglos con JavaScript nativo (.map(), .filter(), .reduce()) antes de enviar datos a la base de datos.",
    secretCommand: "return $input.all().map(item => ({ json: { ...item.json } }))",
  },
  {
    id: "univ-ia-gemini",
    moduleId: "mod-8-ia-gemini",
    slug: "ia-gemini-studio",
    technology: "IA (Gemini Studio)",
    codename: "Supernova Gemini-Core",
    subtitle: "La Singularidad de Inteligencia Generativa",
    category: "IA",
    orbitRadius: 310,
    color: "#D97706",
    gradient: "from-amber-400 via-orange-500 to-neutral-950",
    glow: "rgba(217, 119, 6, 0.75)",
    size: 86,
    x: 82,
    y: 78,
    coreNotes: [
      "Los cuatro pilares de un prompt técnico: Rol (quién es la IA), Tarea (qué debe hacer), Restricciones (qué NO debe hacer) y Formato (JSON / Markdown).",
      "La GEMINI_API_KEY se almacena EXCLUSIVAMENTE en variables de entorno de servidor (src/app/api/gemini/route.ts) y jamás en el cliente.",
      "Usa temperatura baja (0.1 - 0.3) para evaluaciones y clasificación de código precisas y deterministas.",
    ],
    quizHints: [
      {
        questionRef: "¿Dónde debe almacenarse la GEMINI_API_KEY?",
        hint: "Pista clave: Exclusivamente en el servidor (variables de entorno seguras) y nunca en código de cliente ni en Git.",
      },
      {
        questionRef: "¿Qué práctica mejora la consistencia de respuestas?",
        hint: "Pista clave: Usar System Instructions claras, ejemplos de salida (few-shot) y temperatura baja.",
      },
      {
        questionRef: "¿Qué precaución tener con los datos antes de enviarlos?",
        hint: "Pista clave: No incluir contraseñas ni tokens privados, y validar siempre las respuestas generadas.",
      },
    ],
    proTip: "En Google AI Studio, usa la pestaña 'Get code' para exportar la llamada exacta con el SDK @google/genai en TypeScript lista para tu backend de Next.js.",
    secretCommand: "GEMINI_API_KEY=tu_clave_privada_en_.env.local",
  },
];
