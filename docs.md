# Documentacion Proyecto Onboarding

Diseñar un sistema que automatice el proceso de onboarding y capacitación técnica de los pasantes del Leadership
Acceleration Program, integrando tareas, tutoriales de las tecnologías clave y prácticas evaluables en una sola
plataforma, con control de avance por módulos y visibilidad total para los líderes del departamento.

## Objetivos específicos

- Centralizar en un solo sistema las tareas y rutas de aprendizaje que hoy se gestionan en Notion.
- Incorporar un módulo de tutoriales por tecnología, reutilizable entre generaciones de pasantes.
- Diseñar un módulo de prácticas y ejercicios evaluables que valide el aprendizaje real de cada tecnología.
- Establecer un programa inicial de nivelación técnica de 7 días, con módulos progresivos bloqueados.
- Ofrecer visibilidad del avance de cada pasante mediante un panel de administración para los líderes

## Módulos del sistema

| Onboarding progresivo (arranque de 7 días)      | Programa inicial de nivelación técnica, de lo más sencillo a lo más complejo, con módulos progresivos bloqueados: no es posible avanzar al siguiente módulo sin completar el anterior.                                                                                                             |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tutoriales por tecnología                       | • Ficha por tecnología con introducción, video o guía, documentación de referencia y enlaces oficiales.<br>• Contenido reutilizable entre generaciones de pasantes (se crea una vez y se reutiliza).<br>• Posibilidad de marcar tutoriales como vistos/completados.                                |
| Prácticas y ejercicios evaluables               | • Ejercicios guiados (ej. crear un repositorio, construir una API con Express/Node, un flujo en n8n). <br>• Entrega de evidencia (enlace a repositorio, captura, archivo) por parte del pasante.<br>• Retroalimentación o validación por parte del mentor/líder asignado                           |
| Panel de seguimiento y progreso (administrador) | Vista para el equipo de R&D (líderes/mentores) con el avance de cada pasante en tiempo real                                                                                                                                                                                                        |
| Gamificación (opcional)                         | Elementos que fomenten la motivación y el compromiso del pasante durante el programa, en línea con el sistema de insignias que ya existe en el onboarding público de Delphos.<br><br>• Insignias por tecnología dominada o módulo/semana completada. <br>• Barra de progreso general del programa. |
| Integración con el sistema Delphos Onboarding   | Se propone evaluarlo como base técnica para construir los módulos anteriores, en lugar de partir desde cero. El módulo "Estudio" (chatbot, cuestionarios, flashcards, verdadero/falso) podría reutilizarse como motor de las prácticas por tecnología.                                             |

## Programas

| Tecnología          | Versión |
| ------------------- | ------- |
| Next.js             | 16.3.8  |
| TypeScript          | 5.9.3   |
| Supabase (postgres) | 17.11   |

## Modelos

| Tabla                      | Descripción                                                                         |
| -------------------------- | ----------------------------------------------------------------------------------- |
| `users`                    | Personas del sistema, con rol: pasante/trainee o admin/mentor.                      |
| `onboarding_progress`      | Progreso de cada pasante: módulo/semana actual, estado, evidencia y fechas.         |
| `modules`                  | Definición de los módulos del arranque de 7 días y su criterio de aprobación.       |
| `tutorials`                | Contenido formativo por tecnología: guías, videos, documentación y enlaces.         |
| `practices`                | Ejercicios y retos ligados a cada tutorial o módulo, con su criterio de validación. |
| `badges` _(Opcional)_      | Insignias otorgadas por tecnología dominada o módulo completado.                    |
| `feedback_ai` _(Opcional)_ | Sugerencias y retroalimentación generadas por IA                                    |

## Modulo 1: Git Hub

### Presentacion CAPACITACIÓN GITHUB

"Deinsa Global - Por Jocelyn Rivera y Diago Garcia"

- ¿Qué es Git y Git Hub?
- ¿Por qué Git Hub?
- Términos importantes.
- Comandos importantes.

### Presentacion CAPACITACIÓN GITHUB Avanzada

- ¿Qué es GitHub Flow?
- Principales Características de GitHub Flow
- Trabajo en Equipo y Sincronización
- Pull Requests
- Merge vs. Rebase

### Manual GitHub

- ¿Qué es Git hub?
- Términos importantes de Git Hub
- Configurar el Visual Studio Code
- Crea tu primer repositorio
- Clone el repositorio
- Ramas
- Fusionar Ramas
- Eliminar Ramas
- Commit
- Como borrar un repositorio
- Borrar Practicas

### Links

Descargar Git: https://www.youtube.com/watch?v=jdXKwLNUfmg

Crear Una Cuenta:
https://www.youtube.com/watch?v=74toewU92Fw

Curso de Git: Curso interactivo para aprerder git hub https://www.freecodecamp.org/espanol/news/aprende-git-y-github-curso-desde-cero/

Curso de Git Hub para el control de cambios a la hora de trabajar en equipo:
https://edutin.com/curso-de-github
