# BoxPulse Backlog

Este documento funciona como índice maestro del backlog funcional del MVP.

Las especificaciones detalladas viven en `/docs/features` y las tareas ejecutables para Codex deben generarse como GitHub Issues a partir de esas especificaciones.

## Principios

- Documentar primero la feature.
- Crear issues chicas y ejecutables.
- Mantener el naming técnico en inglés.
- Mantener la documentación funcional en español.
- Evitar issues gigantes del tipo `hacer toda la app`.

## Fase 0 - Foundation

Objetivo: preparar el repositorio para desarrollo incremental.

Features/documentos relacionados:

- [001 - Project Setup](./features/001-project-setup.md)
- [002 - Shared Domain Package](./features/002-shared-domain-package.md)

## Fase 1 - Authentication and Roles

Objetivo: permitir acceso seguro y separar experiencias por rol.

Features/documentos relacionados:

- [003 - Auth and Roles](./features/003-auth-and-roles.md)

## Fase 2 - Admin Web

Objetivo: permitir que el gimnasio gestione usuarios y tenga una vista básica de operación.

Features/documentos relacionados:

- [004 - Admin User Management](./features/004-admin-user-management.md)
- [005 - Admin Dashboard](./features/005-admin-dashboard.md)

## Fase 3 - Coach Mobile Exercise Flow

Objetivo: construir el flujo operativo principal del coach dentro del gimnasio.

Features/documentos relacionados:

- [006 - Coach Start Exercise](./features/006-coach-start-exercise.md)
- [007 - Coach Timer Exercise](./features/007-coach-timer-exercise.md)
- [008 - Coach Repetition Exercise](./features/008-coach-repetition-exercise.md)
- [009 - Coach Boxer Tracking](./features/009-coach-boxer-tracking.md)

## Fase 4 - Boxer Mobile Experience

Objetivo: permitir que el boxeador consulte su actividad, registre progreso y gestione su perfil.

Features/documentos relacionados:

- [010 - Boxer Progress Tracking](./features/010-boxer-progress-tracking.md)
- [011 - Boxer Profile Management](./features/011-boxer-profile-management.md)
- [012 - Boxer Attendance and Workout History](./features/012-boxer-attendance-and-workout-history.md)
- [013 - Boxer Progress Analytics](./features/013-boxer-progress-analytics.md)

## Fase 5 - Training Programs

Objetivo: permitir que el coach cree programas, sesiones, bloques y asignaciones.

Features/documentos relacionados:

- [014 - Training Programs](./features/014-training-programs.md)
- [015 - Program Assignments](./features/015-program-assignments.md)

## Fase 6 - Validation

Objetivo: probar el MVP en un gimnasio real y obtener feedback accionable.

Features/documentos relacionados:

- [016 - MVP Validation](./features/016-mvp-validation.md)

## Orden recomendado de implementación

1. Project Setup
2. Shared Domain Package
3. Auth and Roles
4. Admin User Management
5. Coach Start Exercise
6. Coach Timer Exercise
7. Coach Repetition Exercise
8. Boxer Progress Tracking
9. Boxer Profile Management
10. Boxer Attendance and Workout History
11. Training Programs
12. Program Assignments
13. Dashboards
14. MVP Validation

## Convención para issues

Formato sugerido:

```txt
[Feature] Coach Start Exercise
[Task] Create exercise domain types
[Task] Build participant selection screen
[Task] Persist exercise participants
[Task] Add basic tests for exercise creation
```

Cada issue debe incluir:

- contexto
- alcance
- fuera de alcance
- criterios de aceptación
- archivos o áreas esperadas
- referencia al markdown de feature
