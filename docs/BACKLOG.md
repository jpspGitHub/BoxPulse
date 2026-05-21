# BoxPulse Backlog

Este documento funciona como índice maestro del backlog funcional del MVP.

Las especificaciones detalladas viven en `/docs/features` y las tareas ejecutables para Codex deben generarse como GitHub Issues a partir de esas especificaciones.

## Principios

- Documentar primero la feature.
- Crear issues chicas y ejecutables.
- Mantener el naming técnico en inglés.
- Mantener la documentación funcional en español.
- Evitar issues gigantes del tipo `hacer toda la app`.

## Fase 0 - Bootstrap Environment

Objetivo: validar que el ambiente técnico base funciona correctamente antes de implementar lógica de negocio.

Features/documentos relacionados:

- [000 - Bootstrap Environment Validation](./features/000-bootstrap-environment-validation.md)

## Fase 1 - Foundation

Objetivo: preparar el repositorio para desarrollo incremental.

Features/documentos relacionados:

- [001 - Project Setup](./features/001-project-setup.md)
- [002 - Shared Domain Package](./features/002-shared-domain-package.md)

## Fase 2 - Authentication and Roles

Objetivo: permitir acceso seguro y separar experiencias por rol.

Features/documentos relacionados:

- [003 - Auth and Roles](./features/003-auth-and-roles.md)

Tareas ejecutables derivadas:

- [Task] Configure Supabase auth foundation
- [Task] Create shared auth domain contracts
- [Task] Create web auth session provider
- [Task] Create mobile auth session provider
- [Task] Implement role and active-user guards
- [Task] Protect admin web routes
- [Task] Protect mobile coach and boxer routes

## Fase 3 - Admin Web

Objetivo: permitir que el gimnasio gestione usuarios y tenga una vista básica de operación.

Features/documentos relacionados:

- [004 - Admin User Management](./features/004-admin-user-management.md)
- [005 - Admin Dashboard](./features/005-admin-dashboard.md)

## Fase 4 - Coach Mobile Exercise Flow

Objetivo: construir el flujo operativo principal del coach dentro del gimnasio.

Features/documentos relacionados:

- [006 - Coach Start Exercise](./features/006-coach-start-exercise.md)
- [007 - Coach Timer Exercise](./features/007-coach-timer-exercise.md)
- [008 - Coach Repetition Exercise](./features/008-coach-repetition-exercise.md)
- [009 - Coach Boxer Tracking](./features/009-coach-boxer-tracking.md)

## Fase 5 - Boxer Mobile Experience

Objetivo: permitir que el boxeador consulte su actividad, registre progreso y gestione su perfil.

Features/documentos relacionados:

- [010 - Boxer Progress Tracking](./features/010-boxer-progress-tracking.md)
- [011 - Boxer Profile Management](./features/011-boxer-profile-management.md)
- [012 - Boxer Attendance and Workout History](./features/012-boxer-attendance-and-workout-history.md)
- [013 - Boxer Progress Analytics](./features/013-boxer-progress-analytics.md)

## Fase 6 - Training Programs

Objetivo: permitir que el coach cree programas, sesiones, bloques y asignaciones.

Features/documentos relacionados:

- [014 - Training Programs](./features/014-training-programs.md)
- [015 - Program Assignments](./features/015-program-assignments.md)

## Fase 7 - Validation

Objetivo: probar el MVP en un gimnasio real y obtener feedback accionable.

Features/documentos relacionados:

- [016 - MVP Validation](./features/016-mvp-validation.md)

## Orden recomendado de implementación

1. Bootstrap Environment Validation
2. Project Setup
3. Shared Domain Package
4. Configure Supabase auth foundation
5. Create shared auth domain contracts
6. Create web auth session provider
7. Create mobile auth session provider
8. Implement role and active-user guards
9. Protect admin web routes
10. Protect mobile coach and boxer routes
11. Admin User Management
12. Coach Start Exercise
13. Coach Timer Exercise
14. Coach Repetition Exercise
15. Boxer Progress Tracking
16. Boxer Profile Management
17. Boxer Attendance and Workout History
18. Training Programs
19. Program Assignments
20. Dashboards
21. MVP Validation

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
