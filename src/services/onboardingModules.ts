export interface ModuleLesson {
  id: string;
  title: string;
  duration: string;
  summary: string;
  keyPoints: string[];
  codeTitle?: string;
  codeLanguage?: string;
  codeSnippet?: string;
}

export interface ModuleQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ModuleResource {
  label: string;
  url: string;
  type: "Documentación" | "Guía" | "Plantilla" | "Referencia";
}

export interface OnboardingModule {
  id: string;
  order: number;
  slug: string;
  technology: string;
  shortTitle: string;
  category: string;
  icon: string;
  accentColor: string;
  estimatedTime: string;
  whatInternLearns: string;
  suggestedFormat: string;
  overview: string;
  objectives: string[];
  lessons: ModuleLesson[];
  practiceTitle: string;
  practiceDescription: string;
  practiceChecklist: string[];
  evidencePlaceholder: string;
  quiz: ModuleQuizQuestion[];
  resources: ModuleResource[];
}

export const ONBOARDING_MODULES: OnboardingModule[] = [
  {
    id: "mod-1-github",
    order: 1,
    slug: "github",
    technology: "GitHub",
    shortTitle: "GitHub",
    category: "Control de versiones",
    icon: "account_tree",
    accentColor: "#18181B",
    estimatedTime: "45 min",
    whatInternLearns: "Control de versiones, flujo de ramas, pull requests",
    suggestedFormat: "Video + guía + reto de commit/PR",
    overview:
      "Aprende a trabajar de forma colaborativa y segura usando Git y GitHub. Dominarás el ciclo completo de creación de ramas, commits atómicos, sincronización con el repositorio remoto y apertura de Pull Requests listos para revisión de código.",
    objectives: [
      "Configurar Git local y conectar tu cuenta de GitHub correctamente.",
      "Aplicar un flujo de trabajo basado en ramas sin afectar la rama principal.",
      "Escribir mensajes de commit claros, pequeños y trazables.",
      "Crear Pull Requests descriptivos y resolver comentarios de revisión.",
    ],
    lessons: [
      {
        id: "gh-l1",
        title: "Fundamentos de control de versiones con Git",
        duration: "12 min",
        summary:
          "Comprende las tres áreas de Git (Directorio de trabajo, Staging Area y Repositorio) para controlar cada cambio sin perder código ni sobreescribir el trabajo de tu equipo.",
        keyPoints: [
          "Usa git status antes y después de cada operación para validar el estado del árbol.",
          "Agrupa cambios relacionados en commits pequeños con prefijos claros (feat, fix, docs).",
          "Nunca subas archivos sensibles como .env o carpetas generadas como node_modules.",
        ],
        codeTitle: "Flujo diario esencial en terminal",
        codeLanguage: "bash",
        codeSnippet: `git status
git fetch --all
git checkout -b feat/mi-modulo
git add src/components/MiComponente.tsx
git commit -m "feat: agregar componente inicial de modulo"
git push -u origin feat/mi-modulo`,
      },
      {
        id: "gh-l2",
        title: "Flujo de ramas (Branching) y sincronización segura",
        duration: "15 min",
        summary:
          "En equipos de Research & Development cada persona trabaja en su propia rama para mantener main y dev estables. Aprende a traer cambios recientes antes de abrir tu PR.",
        keyPoints: [
          "Mantén tu rama actualizada trayendo cambios desde dev con git pull origin dev.",
          "Evita modificar archivos que pertenecen a otros módulos del equipo.",
          "Ante un conflicto de fusión, revisa ambos bloques con calma y verifica que el proyecto compile.",
        ],
        codeTitle: "Sincronizar cambios del equipo en tu rama",
        codeLanguage: "bash",
        codeSnippet: `git checkout valentina
git fetch origin
git merge origin/dev
# Verifica que no haya conflictos ni errores de compilacion
npm run build`,
      },
      {
        id: "gh-l3",
        title: "Pull Requests y revisión de código profesional",
        duration: "18 min",
        summary:
          "Un Pull Request (PR) es el puente entre tu rama y la integración con el equipo. Un buen PR explica qué se hizo, por qué se hizo y cómo probarlo.",
        keyPoints: [
          "Incluye un título concreto, resumen de cambios y capturas de pantalla si hay cambios de interfaz.",
          "Revisa tu propio diff en GitHub antes de asignar revisores.",
          "Responde a cada comentario del mentor con nuevos commits en la misma rama.",
        ],
      },
    ],
    practiceTitle: "Reto de Commit y Pull Request",
    practiceDescription:
      "Crea una rama nueva a partir de dev, realiza al menos dos commits limpios siguiendo la convención semántica y abre un Pull Request hacia dev con descripción de cambios y evidencia de pruebas.",
    practiceChecklist: [
      "Creé una rama propia sin modificar archivos de otros compañeros.",
      "Realicé commits descriptivos y verifiqué con git status que el árbol quedó limpio.",
      "Subí mi rama al repositorio remoto y preparé un Pull Request documentado.",
    ],
    evidencePlaceholder: "Enlace a tu Pull Request o repositorio en GitHub (ej. https://github.com/org/repo/pull/12)",
    quiz: [
      {
        id: "gh-q1",
        question: "¿Cuál es el objetivo principal de trabajar en una rama separada en lugar de hacer commits directos en main?",
        options: [
          "Evitar usar git push en el proyecto.",
          "Aislar cambios en desarrollo para revisarlos mediante Pull Request sin romper la rama principal.",
          "Eliminar automáticamente el historial anterior del repositorio.",
        ],
        correctIndex: 1,
        explanation: "Las ramas aíslan el trabajo en progreso y permiten revisión de código antes de integrar a main o dev.",
      },
      {
        id: "gh-q2",
        question: "¿Qué comando agrega un archivo específico al área de preparación (staging) antes de crear un commit?",
        options: ["git commit -a", "git add <ruta-del-archivo>", "git branch <ruta-del-archivo>"],
        correctIndex: 1,
        explanation: "git add mueve los cambios seleccionados al staging area para incluirlos en el próximo commit.",
      },
      {
        id: "gh-q3",
        question: "¿Qué debe contener un buen Pull Request en un equipo de desarrollo?",
        options: [
          "Únicamente la palabra 'cambios' sin descripción.",
          "Resumen claro de qué se implementó, contexto y evidencia o pasos de prueba.",
          "Archivos .env y contraseñas de prueba para facilitar la revisión.",
        ],
        correctIndex: 1,
        explanation: "Un PR documentado acelera la revisión y deja trazabilidad técnica para todo el equipo.",
      },
    ],
    resources: [
      { label: "Documentación oficial de GitHub Docs", url: "https://docs.github.com/es", type: "Documentación" },
      { label: "Guía de flujo GitHub Flow", url: "https://docs.github.com/es/get-started/using-github/github-flow", type: "Guía" },
    ],
  },
  {
    id: "mod-2-react-nextjs",
    order: 2,
    slug: "react-nextjs",
    technology: "React / Next.js",
    shortTitle: "React / Next.js",
    category: "Frontend con TypeScript",
    icon: "web",
    accentColor: "#2563EB",
    estimatedTime: "60 min",
    whatInternLearns: "Componentes, rutas, hooks, consumo de APIs (con TypeScript)",
    suggestedFormat: "Tutorial interactivo + mini proyecto",
    overview:
      "Domina el desarrollo de interfaces modernas con React y Next.js App Router usando TypeScript estricto. Aprenderás a estructurar componentes reutilizables, gestionar rutas, aplicar hooks esenciales y consumir APIs de manera tipada y segura.",
    objectives: [
      "Diseñar componentes tipados con interfaces TypeScript claras y reutilizables.",
      "Organizar rutas y layouts con Next.js App Router (Server y Client Components).",
      "Manejar estado local, efectos y memoización con useState, useEffect y useMemo.",
      "Consumir APIs REST con manejo de carga, errores y validación de tipos.",
    ],
    lessons: [
      {
        id: "rn-l1",
        title: "Componentes reutilizables y props tipadas con TypeScript",
        duration: "15 min",
        summary:
          "Divide la interfaz en piezas pequeñas con una única responsabilidad. TypeScript detecta errores de propiedades antes de ejecutar la aplicación.",
        keyPoints: [
          "Define interfaces explícitas para todas las props de tus componentes.",
          "Mantén los componentes de presentación desacoplados de la lógica de datos.",
          "Evita el tipo any; usa tipos concretos o genéricos.",
        ],
        codeTitle: "Componente tipado con TypeScript",
        codeLanguage: "tsx",
        codeSnippet: `interface StatusBadgeProps {
  label: string;
  variant: "completed" | "active" | "locked";
}

export function StatusBadge({ label, variant }: StatusBadgeProps) {
  const styles = {
    completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    active: "bg-orange-50 text-orange-700 border-orange-200",
    locked: "bg-neutral-100 text-neutral-500 border-neutral-200",
  };

  return (
    <span className={\`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold \${styles[variant]}\`}>
      {label}
    </span>
  );
}`,
      },
      {
        id: "rn-l2",
        title: "Rutas en App Router: Server Components vs Client Components",
        duration: "20 min",
        summary:
          "En Next.js App Router, cada carpeta con page.tsx define una ruta y layout.tsx envuelve las vistas hijas. Los componentes son Server Components por defecto; agrega 'use client' solo cuando necesites interactividad o hooks.",
        keyPoints: [
          "Usa layout.tsx para barras laterales y navegación persistente entre rutas.",
          "Usa 'use client' únicamente en componentes que manejan eventos, estado o hooks.",
          "En Next.js 16, params en rutas dinámicas ([slug]) es una Promise y debe resolverse con await.",
        ],
      },
      {
        id: "rn-l3",
        title: "Hooks y consumo de APIs con manejo de estados",
        duration: "25 min",
        summary:
          "Toda petición externa pasa por tres estados: cargando, éxito y error. Encapsula tus llamadas con tipos explícitos y proporciona retroalimentación clara en la interfaz.",
        keyPoints: [
          "Valida response.ok antes de convertir el cuerpo con response.json().",
          "Limpia suscripciones o usa AbortController dentro de useEffect para evitar fugas de memoria.",
          "Muestra skeletons o mensajes claros mientras llegan los datos.",
        ],
        codeTitle: "Consumo tipado de API con React Hook",
        codeLanguage: "tsx",
        codeSnippet: `interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
}

async function fetchTasks(): Promise<TaskItem[]> {
  const res = await fetch("/api/tasks");
  if (!res.ok) throw new Error("No se pudieron cargar las tareas");
  return res.json();
}`,
      },
    ],
    practiceTitle: "Mini Proyecto: Listado interactivo con filtros en Next.js",
    practiceDescription:
      "Construye una vista en Next.js con TypeScript que consuma una API o fuente de datos tipada, permita filtrar por estado y búsqueda de texto, y muestre un formulario controlado.",
    practiceChecklist: [
      "Definí interfaces TypeScript para los datos y las props de los componentes.",
      "Separé la interfaz en componentes reutilizables dentro de src/components.",
      "Implementé filtros reactivos con useState y manejo adecuado de estados vacíos.",
    ],
    evidencePlaceholder: "Enlace al repositorio o captura de tu mini proyecto en React / Next.js",
    quiz: [
      {
        id: "rn-q1",
        question: "¿Cuándo debes agregar la directiva 'use client' al inicio de un archivo en Next.js App Router?",
        options: [
          "En absolutamente todos los archivos del proyecto.",
          "Cuando el componente utiliza hooks de React (useState, useEffect) o eventos interactivos del navegador.",
          "Únicamente dentro de archivos CSS.",
        ],
        correctIndex: 1,
        explanation: "Los Server Components son el valor por defecto; 'use client' habilita interactividad y hooks en el cliente.",
      },
      {
        id: "rn-q2",
        question: "¿Qué archivo dentro de una carpeta de src/app/ convierte esa ruta en una página accesible por URL?",
        options: ["index.html", "page.tsx", "route.css"],
        correctIndex: 1,
        explanation: "En Next.js App Router, el archivo page.tsx expone públicamente la ruta correspondiente.",
      },
      {
        id: "rn-q3",
        question: "¿Por qué es buena práctica tipar las respuestas de fetch con interfaces TypeScript?",
        options: [
          "Para detectar propiedades inexistentes en tiempo de compilación y tener autocompletado seguro.",
          "Porque sin TypeScript fetch no funciona en el navegador.",
          "Para omitir el manejo de errores HTTP.",
        ],
        correctIndex: 0,
        explanation: "TypeScript valida contratos de datos en desarrollo y reduce errores en producción.",
      },
    ],
    resources: [
      { label: "Documentación oficial de Next.js", url: "https://nextjs.org/docs", type: "Documentación" },
      { label: "Guía oficial de React", url: "https://es.react.dev/learn", type: "Guía" },
    ],
  },
  {
    id: "mod-3-nodejs-express",
    order: 3,
    slug: "nodejs-express",
    technology: "Node.js / Express",
    shortTitle: "Node.js / Express",
    category: "Desarrollo Backend",
    icon: "dns",
    accentColor: "#16A34A",
    estimatedTime: "60 min",
    whatInternLearns: "Servidores, rutas, middlewares, controladores",
    suggestedFormat: "Tutorial + construcción de API propia",
    overview:
      "Aprende a construir APIs REST robustas y mantenibles con Node.js y Express. Conocerás cómo levantar un servidor HTTP, separar rutas de controladores, validar entradas con middlewares y responder con códigos de estado estándar.",
    objectives: [
      "Inicializar y estructurar un servidor Express con separación por capas.",
      "Diseñar rutas RESTful usando los verbos GET, POST, PUT/PATCH y DELETE.",
      "Implementar middlewares para autenticación, registro de logs y manejo centralizado de errores.",
      "Encapsular la lógica de negocio en controladores y servicios desacoplados.",
    ],
    lessons: [
      {
        id: "ne-l1",
        title: "Anatomía de un servidor en Node.js y Express",
        duration: "15 min",
        summary:
          "Express simplifica la creación de endpoints HTTP sobre Node.js. Una arquitectura limpia separa la inicialización del servidor, las rutas, los middlewares y los controladores.",
        keyPoints: [
          "Habilita express.json() para leer cuerpos JSON en las peticiones entrantes.",
          "Carga puertos y secretos desde variables de entorno (process.env).",
          "Devuelve siempre códigos HTTP semánticos (200, 201, 400, 401, 404, 500).",
        ],
        codeTitle: "Servidor base con Express",
        codeLanguage: "ts",
        codeSnippet: `import express from "express";
import { internRouter } from "./routes/interns.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());

app.use("/api/interns", internRouter);
app.use(errorHandler);

const PORT = process.env.PORT ?? 4000;
app.listen(PORT, () => console.log(\`Servidor activo en puerto \${PORT}\`));`,
      },
      {
        id: "ne-l2",
        title: "Middlewares: interceptar, validar y proteger peticiones",
        duration: "20 min",
        summary:
          "Un middleware es una función con acceso a req, res y next(). Permite validar payloads, verificar tokens y capturar errores antes de que lleguen al controlador.",
        keyPoints: [
          "Llama siempre a next() para pasar el control al siguiente eslabón de la cadena.",
          "Usa un middleware final de cuatro argumentos (err, req, res, next) para centralizar errores.",
          "Valida los datos de entrada antes de ejecutar consultas en base de datos.",
        ],
        codeTitle: "Middleware de validación de datos",
        codeLanguage: "ts",
        codeSnippet: `import { Request, Response, NextFunction } from "express";

export function validateInternPayload(req: Request, res: Response, next: NextFunction) {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Nombre y correo son obligatorios." });
  }
  next();
}`,
      },
      {
        id: "ne-l3",
        title: "Controladores y diseño de rutas REST",
        duration: "25 min",
        summary:
          "Las rutas definen qué URL atiende cada operación, mientras los controladores coordinan la respuesta y delegan el acceso a datos a la capa de servicios.",
        keyPoints: [
          "Usa sustantivos en plural para recursos (/api/modules, /api/practices).",
          "Mantén los controladores cortos y enfocados en HTTP (leer params/body y responder).",
          "Prueba tus endpoints con Thunder Client, Postman o curl antes de integrarlos al frontend.",
        ],
      },
    ],
    practiceTitle: "Construcción de API REST propia con Express",
    practiceDescription:
      "Implementa una API REST en Node.js + Express con al menos 4 endpoints (GET, POST, PATCH, DELETE) organizados en rutas, controladores y un middleware de validación.",
    practiceChecklist: [
      "Estructuré el proyecto separando routes, controllers y middlewares.",
      "Implementé un middleware que valida el cuerpo de las solicitudes POST.",
      "Probé todos los endpoints y verifiqué los códigos de estado HTTP.",
    ],
    evidencePlaceholder: "Enlace al repositorio de tu API en Express o colección de pruebas",
    quiz: [
      {
        id: "ne-q1",
        question: "¿Qué hace la función next() dentro de un middleware de Express?",
        options: [
          "Detiene el servidor inmediatamente.",
          "Pasa la ejecución al siguiente middleware o controlador de la ruta.",
          "Reinicia la base de datos conectada.",
        ],
        correctIndex: 1,
        explanation: "Sin llamar a next() (o enviar una respuesta con res), la petición quedaría colgada indefinidamente.",
      },
      {
        id: "ne-q2",
        question: "¿Qué código de estado HTTP es el estándar al crear un nuevo recurso exitosamente con POST?",
        options: ["201 Created", "404 Not Found", "500 Internal Server Error"],
        correctIndex: 0,
        explanation: "201 Created indica que la solicitud tuvo éxito y resultó en la creación de un nuevo recurso.",
      },
      {
        id: "ne-q3",
        question: "¿Por qué se separan las rutas de los controladores y servicios?",
        options: [
          "Para hacer el código más modular, testeable y fácil de mantener en equipo.",
          "Porque Express solo permite un endpoint por archivo.",
          "Para evitar usar JSON en las respuestas.",
        ],
        correctIndex: 0,
        explanation: "La separación de responsabilidades evita archivos monolíticos y facilita el mantenimiento.",
      },
    ],
    resources: [
      { label: "Documentación oficial de Express", url: "https://expressjs.com/es/", type: "Documentación" },
      { label: "Guía oficial de Node.js", url: "https://nodejs.org/en/learn", type: "Guía" },
    ],
  },
  {
    id: "mod-4-supabase-firebase",
    order: 4,
    slug: "supabase-firebase",
    technology: "Supabase / Firebase",
    shortTitle: "Supabase / Firebase",
    category: "Datos y Seguridad",
    icon: "database",
    accentColor: "#059669",
    estimatedTime: "65 min",
    whatInternLearns: "Base de datos, autenticación, reglas de seguridad (RLS / Firestore rules)",
    suggestedFormat: "Tutorial + práctica de CRUD",
    overview:
      "Conecta tus aplicaciones a bases de datos reales en entornos de staging con Supabase (PostgreSQL + Auth + RLS) y comprende el modelo equivalente en Firebase (Firestore + Auth + Security Rules).",
    objectives: [
      "Modelar tablas relacionales y relaciones clave foránea en Supabase PostgreSQL.",
      "Implementar flujos de autenticación de usuarios y lectura de sesión en servidor y cliente.",
      "Configurar políticas Row Level Security (RLS) o reglas de Firestore para proteger cada fila.",
      "Ejecutar operaciones CRUD completas con manejo de errores.",
    ],
    lessons: [
      {
        id: "sf-l1",
        title: "Modelado de datos y operaciones CRUD en Supabase",
        duration: "20 min",
        summary:
          "Supabase expone tu base PostgreSQL mediante un cliente tipado. Aprende a leer, insertar, actualizar y eliminar registros manejando siempre la propiedad error.",
        keyPoints: [
          "Trabaja siempre en un entorno de staging durante el onboarding, nunca contra producción.",
          "Selecciona únicamente las columnas que necesitas con .select('id, name, status').",
          "Revisa siempre el objeto error devuelto por cada consulta.",
        ],
        codeTitle: "Operaciones CRUD con el cliente de Supabase",
        codeLanguage: "ts",
        codeSnippet: `const supabase = await createClient();

// Leer progreso del usuario autenticado
const { data, error } = await supabase
  .from("onboarding_progress")
  .select("module_id, status, updated_at")
  .eq("user_id", user.id);

if (error) throw new Error(error.message);`,
      },
      {
        id: "sf-l2",
        title: "Autenticación y gestión de sesiones",
        duration: "20 min",
        summary:
          "Usa Supabase Auth o Firebase Auth para gestionar registros, inicios de sesión, actualización de perfil y cierre de sesión sin construir criptografía desde cero.",
        keyPoints: [
          "En Next.js App Router, valida la sesión en servidor con createServerClient y cookies.",
          "Actualiza metadatos del usuario con supabase.auth.updateUser({ data }).",
          "Al cerrar sesión con supabase.auth.signOut(), redirige y refresca el enrutador.",
        ],
      },
      {
        id: "sf-l3",
        title: "Reglas de seguridad: RLS en Supabase y Firestore Rules",
        duration: "25 min",
        summary:
          "La seguridad real vive en la base de datos, no solo en el frontend. Con Row Level Security (RLS) garantizas que un pasante únicamente vea y edite su propio progreso.",
        keyPoints: [
          "Activa ENABLE ROW LEVEL SECURITY en todas las tablas con datos de usuario.",
          "Usa auth.uid() = user_id en políticas SELECT y UPDATE para usuarios pasantes.",
          "En Firebase Firestore, aplica reglas equivalentes comparando request.auth.uid con el propietario del documento.",
        ],
        codeTitle: "Política RLS en PostgreSQL (Supabase)",
        codeLanguage: "sql",
        codeSnippet: `ALTER TABLE onboarding_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pasante lee su propio progreso"
ON onboarding_progress
FOR SELECT
USING (auth.uid() = user_id);`,
      },
    ],
    practiceTitle: "Práctica de CRUD seguro con RLS",
    practiceDescription:
      "Crea una tabla de práctica en tu proyecto de staging en Supabase (o colección en Firebase), habilita RLS/Security Rules y ejecuta un CRUD completo verificado para el usuario autenticado.",
    practiceChecklist: [
      "Creé el esquema de datos en entorno staging con claves primarias claras.",
      "Habilité RLS / reglas de seguridad restringiendo el acceso por auth.uid().",
      "Probé operaciones de lectura, creación, actualización y borrado con manejo de errores.",
    ],
    evidencePlaceholder: "Enlace al repositorio con tu código CRUD o captura de políticas RLS",
    quiz: [
      {
        id: "sf-q1",
        question: "¿Qué garantiza Row Level Security (RLS) en Supabase?",
        options: [
          "Que el sitio cargue fuentes de Google más rápido.",
          "Que cada consulta a la base de datos valide a nivel de fila qué registros puede leer o modificar el usuario.",
          "Que cualquier visitante anónimo pueda borrar tablas.",
        ],
        correctIndex: 1,
        explanation: "RLS aplica control de acceso directamente en PostgreSQL para cada operación SQL.",
      },
      {
        id: "sf-q2",
        question: "¿Qué función devuelve el identificador del usuario autenticado dentro de una política RLS en Supabase?",
        options: ["auth.uid()", "window.userId", "process.env.USER"],
        correctIndex: 0,
        explanation: "auth.uid() extrae el UUID del token JWT del usuario autenticado en la sesión actual.",
      },
      {
        id: "sf-q3",
        question: "¿Sobre qué entorno debes realizar las prácticas de conexión a base de datos durante el onboarding?",
        options: [
          "Directamente en la base de datos de producción con clientes reales.",
          "Siempre en un entorno de staging o pruebas aislado.",
          "En un archivo de texto sin respaldo.",
        ],
        correctIndex: 1,
        explanation: "Nunca se realizan pruebas de onboarding sobre datos de producción; siempre se usa staging.",
      },
    ],
    resources: [
      { label: "Documentación de Supabase RLS", url: "https://supabase.com/docs/guides/database/postgres/row-level-security", type: "Documentación" },
      { label: "Reglas de seguridad de Firebase Firestore", url: "https://firebase.google.com/docs/firestore/security/get-started", type: "Documentación" },
    ],
  },
  {
    id: "mod-5-notion",
    order: 5,
    slug: "notion",
    technology: "Notion",
    shortTitle: "Notion",
    category: "Productividad y Documentación",
    icon: "description",
    accentColor: "#374151",
    estimatedTime: "35 min",
    whatInternLearns: "Organización de tareas y documentación",
    suggestedFormat: "Guía rápida + plantilla de uso",
    overview:
      "Aprende a estructurar tareas semanales, minutas de reunión y documentación técnica en Notion de forma clara y reutilizable para que cualquier miembro del equipo entienda el contexto en minutos.",
    objectives: [
      "Organizar tareas con bases de datos filtradas por estado, prioridad y responsable.",
      "Documentar decisiones técnicas, arquitectura y pasos de instalación de forma estandarizada.",
      "Crear plantillas reutilizables para reportes de avance y entregas semanales.",
    ],
    lessons: [
      {
        id: "nt-l1",
        title: "Bases de datos de tareas y vistas operativas",
        duration: "15 min",
        summary:
          "En lugar de listas sueltas de texto, Notion brilla cuando usas bases de datos con propiedades consistentes (Estado, Fecha límite, Tecnología, Evidencia) y vistas Kanban o Tabla.",
        keyPoints: [
          "Define propiedades estándar: Pendiente, En progreso, En revisión y Completado.",
          "Crea vistas filtradas por responsable para enfocar tu semana sin ruido.",
          "Vincula siempre el PR o entregable en la propiedad de evidencia de cada tarjeta.",
        ],
      },
      {
        id: "nt-l2",
        title: "Documentación técnica clara y plantillas de uso",
        duration: "20 min",
        summary:
          "Documentar bien ahorra horas al equipo. Una buena ficha técnica incluye objetivo, prerrequisitos, pasos reproducibles, capturas y soluciones a errores frecuentes.",
        keyPoints: [
          "Usa encabezados jerárquicos (H1, H2, H3) y bloques de código con lenguaje especificado.",
          "Agrega una sección de 'Decisiones y riesgos' al final de cada propuesta.",
          "Convierte tus estructuras repetitivas en botones de plantilla dentro de la base de datos.",
        ],
        codeTitle: "Plantilla estándar de documento técnico",
        codeLanguage: "markdown",
        codeSnippet: `# Nombre del Módulo / Funcionalidad
- Responsable: [Nombre y Apellidos]
- Fecha: [YYYY-MM-DD]
- Estado: En progreso / Completado

## 1. Objetivo
Descripción breve del problema que resuelve.

## 2. Pasos técnicos y arquitectura
1. Rama de trabajo y archivos creados
2. Variables de entorno requeridas
3. Validación y pruebas realizadas

## 3. Enlaces de evidencia
- Pull Request: [URL]`,
      },
    ],
    practiceTitle: "Plantilla de organización y documentación semanal",
    practiceDescription:
      "Crea en Notion una página de documentación técnica para uno de tus módulos anteriores usando una base de datos de tareas con al menos 3 estados y una plantilla de minuta/avance.",
    practiceChecklist: [
      "Creé una base de datos de tareas con propiedades de Estado, Prioridad y Evidencia.",
      "Redacté una ficha de documentación técnica estructurada con bloques de código.",
      "Configuré una vista filtrada para seguimiento semanal.",
    ],
    evidencePlaceholder: "Enlace a tu página o plantilla de Notion (o resumen de estructura creada)",
    quiz: [
      {
        id: "nt-q1",
        question: "¿Qué ventaja ofrece usar una base de datos en Notion frente a una lista simple de viñetas?",
        options: [
          "Permite filtrar, ordenar, cambiar entre vista Kanban/Tabla y asociar propiedades estructuradas.",
          "Impide que otras personas del equipo lean la información.",
          "Reemplaza la necesidad de usar Git.",
        ],
        correctIndex: 0,
        explanation: "Las bases de datos en Notion permiten múltiples vistas y seguimiento estructurado por propiedades.",
      },
      {
        id: "nt-q2",
        question: "¿Qué elemento es indispensable en una documentación técnica reutilizable?",
        options: [
          "Párrafos largos sin títulos ni ejemplos.",
          "Objetivo claro, prerrequisitos, pasos reproducibles y enlaces de referencia.",
          "Contraste bajo para ocultar los comandos.",
        ],
        correctIndex: 1,
        explanation: "Una estructura clara y reproducible permite que futuros pasantes sigan la guía sin bloqueos.",
      },
      {
        id: "nt-q3",
        question: "¿Para qué sirven las plantillas dentro de una base de datos de Notion?",
        options: [
          "Para estandarizar el formato de nuevas tareas, minutas o fichas con un solo clic.",
          "Para eliminar páginas antiguas automáticamente.",
          "Para compilar código TypeScript.",
        ],
        correctIndex: 0,
        explanation: "Las plantillas aseguran consistencia en toda la documentación del equipo.",
      },
    ],
    resources: [
      { label: "Centro de ayuda oficial de Notion", url: "https://www.notion.so/help", type: "Documentación" },
      { label: "Guía de bases de datos en Notion", url: "https://www.notion.so/help/category/databases", type: "Plantilla" },
    ],
  },
  {
    id: "mod-6-make",
    order: 6,
    slug: "make",
    technology: "Make",
    shortTitle: "Make",
    category: "Automatización No-Code",
    icon: "hub",
    accentColor: "#7C3AED",
    estimatedTime: "45 min",
    whatInternLearns: "Automatizaciones sin código, integraciones",
    suggestedFormat: "Tutorial + automatización guiada",
    overview:
      "Conecta aplicaciones empresariales sin escribir infraestructura repetitiva usando Make. Aprenderás a diseñar escenarios con disparadores (triggers), filtros, enrutadores y mapeo de datos entre servicios.",
    objectives: [
      "Comprender la diferencia entre triggers instantáneos (webhooks) y programados (polling).",
      "Mapear datos entre módulos y aplicar transformaciones básicas de texto y fecha.",
      "Usar filtros y routers para dividir flujos según reglas de negocio.",
      "Configurar manejo de errores e inspeccionar el historial de ejecuciones.",
    ],
    lessons: [
      {
        id: "mk-l1",
        title: "Escenarios, Triggers y Acciones en Make",
        duration: "20 min",
        summary:
          "Un escenario en Make inicia cuando ocurre un evento (por ejemplo, un formulario enviado o una fila nueva) y encadena módulos que ejecutan acciones en Notion, correo, Slack o Google Sheets.",
        keyPoints: [
          "Cada módulo consume operaciones: usa filtros temprano para evitar ejecuciones innecesarias.",
          "Inspecciona los 'bundles' de salida después de ejecutar Run Once para mapear campos exactos.",
          "Nombra cada escenario con el formato [Área] Origen -> Destino.",
        ],
      },
      {
        id: "mk-l2",
        title: "Routers, filtros y buenas prácticas de integración",
        duration: "25 min",
        summary:
          "Los Routers permiten bifurcaciones condicionales dentro del mismo escenario, mientras que los manejadores de error evitan que un fallo puntual detenga toda la automatización.",
        keyPoints: [
          "Define un filtro fallback en el Router para capturar casos no previstos.",
          "Nunca pongas llaves API en texto plano dentro de notas compartidas; usa Connections de Make.",
          "Prueba siempre con datos de prueba antes de activar el calendario en producción.",
        ],
        codeTitle: "Ejemplo de flujo automatizado en Make",
        codeLanguage: "text",
        codeSnippet: `[Trigger: Webhook de Registro de Pasante]
    |
    +--> [Filtro: correo contiene @deinsaglobal.com]
    |       |
    |       +--> [Router]
    |               |-- Ruta A: Crear ficha en Notion (Base Onboarding)
    |               |-- Ruta B: Enviar correo de bienvenida con guia inicial`,
      },
    ],
    practiceTitle: "Automatización guiada en Make",
    practiceDescription:
      "Diseña un escenario en Make que reciba un evento (Webhook o formulario), aplique al menos un filtro condicional y registre automáticamente la información en una hoja o base de datos con notificación.",
    practiceChecklist: [
      "Configuré un Trigger funcional y verifiqué el payload de entrada.",
      "Añadí al menos un filtro o Router con condición clara.",
      "Ejecuté el escenario con éxito y revisé el historial de operaciones.",
    ],
    evidencePlaceholder: "Descripción o enlace a captura/exportación de tu escenario en Make",
    quiz: [
      {
        id: "mk-q1",
        question: "¿Para qué sirve un Router dentro de un escenario de Make?",
        options: [
          "Para dividir el flujo en múltiples rutas paralelas o condicionales según filtros.",
          "Para borrar la cuenta de Make.",
          "Para reemplazar las credenciales de autenticación.",
        ],
        correctIndex: 0,
        explanation: "El Router permite enviar el mismo dato hacia distintas ramas con filtros independientes.",
      },
      {
        id: "mk-q2",
        question: "¿Por qué conviene colocar filtros lo más cerca posible del Trigger?",
        options: [
          "Para ahorrar operaciones y evitar procesar datos que no cumplen la regla de negocio.",
          "Porque Make no permite filtros al final.",
          "Para aumentar el consumo de red.",
        ],
        correctIndex: 0,
        explanation: "Filtrar temprano detiene bundles irrelevantes y optimiza el consumo de operaciones.",
      },
      {
        id: "mk-q3",
        question: "¿Qué diferencia a un Trigger instantáneo (Webhook) de uno programado (Polling)?",
        options: [
          "El Webhook reacciona en tiempo real al recibir una llamada HTTP; el Polling consulta cada cierto intervalo.",
          "El Polling solo funciona los fines de semana.",
          "No existe ninguna diferencia técnica.",
        ],
        correctIndex: 0,
        explanation: "Los webhooks reciben datos al instante cuando ocurre el evento, sin esperar intervalos de consulta.",
      },
    ],
    resources: [
      { label: "Make Academy oficial", url: "https://academy.make.com/", type: "Guía" },
      { label: "Centro de ayuda de Make", url: "https://www.make.com/en/help/home", type: "Documentación" },
    ],
  },
  {
    id: "mod-7-n8n",
    order: 7,
    slug: "n8n",
    technology: "n8n",
    shortTitle: "n8n",
    category: "Flujos y Webhooks",
    icon: "workflow",
    accentColor: "#EA580C",
    estimatedTime: "55 min",
    whatInternLearns: "Flujos de automatización, nodos, webhooks",
    suggestedFormat: "Tutorial + primer flujo funcional",
    overview:
      "Construye automatizaciones avanzadas y auto-hospedables con n8n. Aprenderás a recibir eventos vía Webhook, transformar estructuras JSON con nodos Code/Set, conectar APIs externas con HTTP Request y devolver respuestas personalizadas.",
    objectives: [
      "Crear flujos de trabajo conectando nodos Trigger, transformación y acción.",
      "Configurar Webhooks POST/GET y probarlos con payloads JSON reales.",
      "Transformar datos usando expresiones {{ $json.campo }} y nodos IF / Switch.",
      "Consumir APIs externas mediante el nodo HTTP Request con autenticación segura.",
    ],
    lessons: [
      {
        id: "n8n-l1",
        title: "Arquitectura de nodos y estructura de datos en n8n",
        duration: "20 min",
        summary:
          "En n8n, cada nodo recibe y emite un arreglo de ítems JSON. Entender esta estructura te permite encadenar nodos sin errores y usar expresiones dinámicas.",
        keyPoints: [
          "Cada ítem viaja como { json: { ... } } entre nodos consecutivos.",
          "Usa el nodo Edit Fields (Set) para limpiar y renombrar propiedades antes de enviarlas a otra API.",
          "Aprovecha la vista de esquema y JSON en cada nodo para arrastrar expresiones exactas.",
        ],
      },
      {
        id: "n8n-l2",
        title: "Webhooks, nodo IF y peticiones HTTP Request",
        duration: "35 min",
        summary:
          "Los webhooks convierten tu flujo de n8n en un microservicio automatizado capaz de recibir eventos desde tu aplicación Next.js o Supabase y ejecutar integraciones complejas.",
        keyPoints: [
          "Diferencia la Test URL (solo activa al pulsar Listen) de la Production URL (requiere flujo activo).",
          "Agrega validación con un nodo IF antes de escribir en sistemas externos.",
          "Usa el nodo Respond to Webhook para devolver un JSON estructurado al cliente que llamó el flujo.",
        ],
        codeTitle: "Ejemplo de expresión y transformación en nodo Code de n8n",
        codeLanguage: "js",
        codeSnippet: `// Transformación de ítems en nodo Code de n8n
return $input.all().map((item) => {
  const { firstName, lastName, moduleName } = item.json.body;
  return {
    json: {
      internFullName: \`\${firstName} \${lastName}\`.trim(),
      completedModule: moduleName,
      processedAt: new Date().toISOString(),
    },
  };
});`,
      },
    ],
    practiceTitle: "Primer flujo funcional con Webhook en n8n",
    practiceDescription:
      "Construye un flujo en n8n que reciba un JSON por Webhook, valide los campos con un nodo IF, transforme el contenido y responda con un mensaje estructurado o lo envíe a una API/base de datos.",
    practiceChecklist: [
      "Configuré un nodo Webhook POST y probé el envío de un JSON de prueba.",
      "Añadí lógica condicional con un nodo IF y transformación con Set o Code.",
      "Verifiqué la ejecución completa sin errores en el canvas de n8n.",
    ],
    evidencePlaceholder: "Enlace a archivo JSON exportado del flujo n8n o captura de ejecución",
    quiz: [
      {
        id: "n8n-q1",
        question: "¿Cuál es la diferencia entre Test URL y Production URL en un nodo Webhook de n8n?",
        options: [
          "La Test URL escucha una sola ejecución en modo edición; la Production URL opera continuamente cuando el flujo está activado.",
          "La Production URL no acepta peticiones POST.",
          "La Test URL borra las credenciales guardadas.",
        ],
        correctIndex: 0,
        explanation: "Durante desarrollo pruebas con Test URL y al publicar el flujo activado consumes la Production URL.",
      },
      {
        id: "n8n-q2",
        question: "¿Cómo accedes al campo 'email' del JSON entrante dentro de una expresión de n8n?",
        options: ["{{ $json.email }}", "SELECT email FROM n8n", "css(email)"],
        correctIndex: 0,
        explanation: "n8n utiliza expresiones entre dobles llaves con $json para referenciar propiedades del ítem actual.",
      },
      {
        id: "n8n-q3",
        question: "¿Qué nodo de n8n permite conectarse a cualquier API REST aunque no tenga una integración nativa?",
        options: ["HTTP Request", "Sticky Note", "No Operation"],
        correctIndex: 0,
        explanation: "El nodo HTTP Request permite consumir cualquier endpoint REST con encabezados, métodos y autenticación.",
      },
    ],
    resources: [
      { label: "Documentación oficial de n8n", url: "https://docs.n8n.io/", type: "Documentación" },
      { label: "Guía de Webhooks en n8n", url: "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/", type: "Guía" },
    ],
  },
  {
    id: "mod-8-ia-gemini",
    order: 8,
    slug: "ia-gemini-studio",
    technology: "Inteligencia Artificial (Gemini Studio)",
    shortTitle: "IA (Gemini Studio)",
    category: "Inteligencia Artificial",
    icon: "auto_awesome",
    accentColor: "#D97706",
    estimatedTime: "55 min",
    whatInternLearns: "Prompting, integración de IA en proyectos, buenas prácticas",
    suggestedFormat: "Tutorial + ejercicio de integración",
    overview:
      "Integra modelos generativos de Google Gemini de manera responsable y efectiva en productos reales. Aprenderás ingeniería de prompts estructurada, llamadas seguras desde el servidor (Route Handlers) y buenas prácticas de seguridad, latencia y evaluación.",
    objectives: [
      "Diseñar prompts claros con rol, contexto, restricciones y formato de salida esperado.",
      "Prototipar y ajustar parámetros (temperatura, instrucciones de sistema) en Google AI Studio.",
      "Integrar la API de Gemini exclusivamente desde el backend para proteger la API Key.",
      "Aplicar buenas prácticas: validación de salida, manejo de límites y privacidad de datos.",
    ],
    lessons: [
      {
        id: "ai-l1",
        title: "Ingeniería de Prompting estructurada en Gemini Studio",
        duration: "20 min",
        summary:
          "Un buen prompt reduce ambigüedad y mejora la consistencia del modelo. Separa las instrucciones del sistema (System Instructions) de los datos variables del usuario.",
        keyPoints: [
          "Define cuatro pilares: Rol, Tarea concreta, Contexto/Restricciones y Formato de salida.",
          "Usa temperatura baja (0.1 - 0.3) para tareas deterministas como clasificación o revisión técnica.",
          "Proporciona 1 o 2 ejemplos (few-shot) cuando necesites un formato JSON estricto.",
        ],
      },
      {
        id: "ai-l2",
        title: "Integración segura en Next.js (Route Handlers) y buenas prácticas",
        duration: "35 min",
        summary:
          "Nunca expongas tu clave de Gemini en el navegador con prefijo NEXT_PUBLIC_. Crea un Route Handler en src/app/api/gemini/route.ts que valide la solicitud del usuario antes de llamar al modelo.",
        keyPoints: [
          "Almacena GEMINI_API_KEY únicamente en variables de entorno de servidor.",
          "Sanitiza entradas, limita longitud máxima y nunca envíes secretos o datos sensibles innecesarios.",
          "Trata la respuesta de la IA como sugerencia verificable: valida el JSON antes de renderizarlo.",
        ],
        codeTitle: "Patrón seguro de integración en Route Handler",
        codeLanguage: "ts",
        codeSnippet: `// src/app/api/gemini/route.ts (ejemplo de referencia)
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { prompt } = await request.json();
  if (!prompt || typeof prompt !== "string") {
    return NextResponse.json({ error: "Prompt inválido" }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API Key no configurada" }, { status: 500 });
  }

  // Llamada segura desde servidor hacia la API de Gemini
  return NextResponse.json({ ok: true });
}`,
      },
    ],
    practiceTitle: "Ejercicio de integración con Gemini Studio",
    practiceDescription:
      "Prototipa un prompt con System Instructions en Google AI Studio para generar retroalimentación técnica estructurada y documenta cómo integrarlo de forma segura desde un endpoint de servidor.",
    practiceChecklist: [
      "Diseñé un prompt con rol, contexto, restricciones y salida estructurada en Gemini Studio.",
      "Verifiqué que la API Key se mantenga exclusivamente en el servidor y fuera de Git.",
      "Documenté casos borde y buenas prácticas de validación de respuestas de IA.",
    ],
    evidencePlaceholder: "Enlace a tu ejercicio de integración o resumen del prompt validado en Gemini Studio",
    quiz: [
      {
        id: "ai-q1",
        question: "¿Dónde debe almacenarse y utilizarse la GEMINI_API_KEY en un proyecto Next.js?",
        options: [
          "En código cliente con NEXT_PUBLIC_GEMINI_API_KEY.",
          "Exclusivamente en variables de entorno del servidor (Route Handlers / Server Actions) y nunca en Git.",
          "Escrita directamente en un botón del componente Login.",
        ],
        correctIndex: 1,
        explanation: "Mantener la API key solo en el servidor evita que terceros extraigan y abusen de tu cuota.",
      },
      {
        id: "ai-q2",
        question: "¿Qué práctica mejora más la consistencia de respuestas técnicas en Gemini Studio?",
        options: [
          "Escribir prompts de una sola palabra sin contexto.",
          "Usar System Instructions claras, ejemplos de formato esperado y temperatura baja.",
          "Subir la temperatura al máximo para obtener respuestas aleatorias.",
        ],
        correctIndex: 1,
        explanation: "Instrucciones estructuradas y baja temperatura producen salidas predecibles y útiles.",
      },
      {
        id: "ai-q3",
        question: "¿Qué precaución debes tener con los datos antes de enviarlos a un modelo de IA?",
        options: [
          "No incluir contraseñas, tokens privados ni información confidencial innecesaria y validar siempre la salida.",
          "Enviar toda la base de datos de producción en cada prompt.",
          "Confiar en la respuesta sin revisarla ni validar tipos.",
        ],
        correctIndex: 0,
        explanation: "Proteger la privacidad de datos y validar las respuestas son pilares de buenas prácticas con IA.",
      },
    ],
    resources: [
      { label: "Google AI Studio", url: "https://aistudio.google.com/", type: "Referencia" },
      { label: "Documentación de Gemini API", url: "https://ai.google.dev/gemini-api/docs", type: "Documentación" },
    ],
  },
];

export function getModuleBySlug(slug: string): OnboardingModule | undefined {
  return ONBOARDING_MODULES.find((mod) => mod.slug === slug);
}

export function getNextModule(currentSlug: string): OnboardingModule | undefined {
  const idx = ONBOARDING_MODULES.findIndex((mod) => mod.slug === currentSlug);
  if (idx === -1 || idx + 1 >= ONBOARDING_MODULES.length) return undefined;
  return ONBOARDING_MODULES[idx + 1];
}
