# Agent Prompt: Execute Next Ready Task

## Objetivo

Ejecutar exactamente una tarea lista para desarrollo desde el GitHub Project de BoxPulse.

El agente debe:

1. Buscar tareas en el GitHub Project.
2. Filtrar solo las tareas con estado `Ready`.
3. Tomar una sola tarea según prioridad y fecha de creación.
4. Mover la tarea a `In Progress` cuando empiece a trabajar.
5. Desarrollarla en una branch aparte.
6. Correr las validaciones necesarias.
7. Crear un Pull Request contra `dev/main` con detalle de cambios.
8. Mover la tarea a `In Review` cuando el PR quede creado.
9. No hacer merge del PR. El merge es manual.

## Repository

`jpspGitHub/BoxPulse`

## GitHub Project

URL:

```txt
https://github.com/users/jpspGitHub/projects/9/views/1
```

## Base Branch

```txt
dev/main
```

## Required Reading

Antes de trabajar, leer:

- `AGENTS.md`
- `docs/PROJECT_CONTEXT.md`
- `docs/BACKLOG.md`
- `docs/PRIORITIZATION.md`
- `docs/ENTITIES.md`
- `docs/API_CONTRACT.md`
- `docs/features/*.md`

Si la tarea referencia un documento específico de feature, leerlo completo antes de implementar.

## Task Selection Rules

Buscar items en el GitHub Project con:

```txt
Status = Ready
```

Tomar una sola task.

Orden de selección:

1. Mayor prioridad.
2. Fecha de creación más antigua.

Prioridad ordenada así:

```txt
P0 > P1 > P2
```

Si el Project tiene un campo `Priority`, usarlo.

Si no existe campo `Priority`, buscar prioridad en:

- body del item
- linked issue
- `docs/PRIORITIZATION.md`

Si no se puede determinar prioridad, asumir `P2` y reportarlo como warning.

## Project Status Workflow

Estados esperados:

```txt
Ready -> In Progress -> In Review -> Done
```

Reglas:

- Solo tomar tareas en `Ready`.
- Al seleccionar una tarea y antes de modificar código, moverla a `In Progress`.
- Al crear el PR, moverla a `In Review`.
- Nunca moverla a `Done`.
- El estado `Done` queda reservado para después del merge manual y validación humana.

Si el Project no permite actualizar el estado:

- dejar comentario en la issue/item explicando el cambio de estado esperado
- continuar solo si el alcance es claro
- reportar el bloqueo parcial en la respuesta final

## Task Types

El agente puede trabajar sobre:

- GitHub Project item
- GitHub Issue linkeada al Project item

Si el Project item no tiene issue asociada, usar el contenido del item como fuente de alcance.

Si existe issue asociada, la issue es la fuente principal de ejecución.

## Ambiguity and Blocked Handling

Si la task es ambigua, demasiado grande, contradictoria o no tiene suficiente información para implementarse con seguridad:

1. No implementar.
2. No crear branch de desarrollo.
3. Agregar label `blocked` al ticket/issue si existe.
4. Si no existe la label `blocked`, crearla si la herramienta lo permite.
5. Agregar un comentario en el ticket/issue explicando qué información necesita el agente para continuar.
6. Mantener o mover el estado a `Ready` solo si todavía no empezó trabajo.
7. Si ya fue movida a `In Progress`, moverla a `Ready` o `Blocked` si el Project tiene ese estado.
8. Reportar el bloqueo en la respuesta final.

Comentario sugerido:

```md
El agente no puede avanzar de forma segura porque necesita la siguiente información:

- ...

Cuando esta información esté definida, quitar la label `blocked` y volver a dejar la tarea en `Ready`.
```

No improvisar decisiones funcionales importantes.

## Scope Rules

Implementar únicamente la task seleccionada.

No tomar más de una task.

No implementar features fuera de alcance.

No hacer refactors grandes no pedidos.

No modificar documentación salvo que:

- la task lo pida explícitamente
- el cambio implementado modifica contratos, entidades o reglas documentadas

Si aparece trabajo adicional necesario, reportarlo como follow-up y no implementarlo.

## Branch Rules

Crear branch desde `dev/main`.

Formato de branch:

```txt
feature/<task-number-or-slug>
```

Ejemplos:

```txt
feature/000-bootstrap-environment-validation
feature/coach-timer-exercise
fix/api-healthcheck
```

Usar nombres cortos, claros y en inglés.

## Implementation Rules

Seguir `AGENTS.md`.

Respetar:

- `pnpm`
- API-first
- TypeScript
- Zod
- lint obligatorio
- testing liviano
- control estricto de scope
- PR description en español

## Checks

Antes de crear PR, correr los checks disponibles.

Intentar ejecutar:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Si algún script no existe, reportarlo.

Si algún check falla por causa relacionada al cambio, corregirlo antes de abrir PR.

Si algún check falla por causa preexistente o por ambiente local, documentarlo claramente en el PR.

Para tareas Docker/bootstrap, también validar si aplica:

```bash
pnpm docker:up
curl http://localhost:3001/health
pnpm docker:down
```

## Pull Request Rules

Crear PR contra:

```txt
dev/main
```

No crear PR contra `main`.

No hacer merge.

El merge del PR será manual.

## PR Title

Usar Conventional Commits en inglés.

Ejemplos:

```txt
feat(api): add healthcheck endpoint
feat(mobile): add coach timer screen
chore(repo): configure pnpm workspace
```

## PR Description

La descripción del PR debe estar en español.

Formato obligatorio:

```md
## Resumen

Describe brevemente qué se implementó.

## Task ejecutada

- Project: https://github.com/users/jpspGitHub/projects/9/views/1
- Task: <title>
- Priority: <P0/P1/P2>

## Cambios principales

- ...

## Validaciones realizadas

- [ ] pnpm install
- [ ] pnpm lint
- [ ] pnpm typecheck
- [ ] pnpm test
- [ ] pnpm build

## Fuera de alcance

- ...

## Pendientes / Riesgos

- ...
```

Marcar checks como realizados solo si realmente se ejecutaron.

## Project Item Update After PR

Después de crear el PR:

- No mover a `Done`.
- Si el Project permite actualizar estado, mover la task a `In Review`.
- Si no se puede actualizar el Project, dejar comentario en la issue/item indicando el PR creado y que debería pasar a `In Review`.

Comentario sugerido:

```md
PR creado: <PR URL>

La tarea queda lista para revisión manual. Estado esperado: `In Review`.
```

## Failure Handling

Si no hay tareas en `Ready`, terminar sin hacer cambios y reportar:

```md
No hay tareas en estado Ready.
```

Si no se puede acceder al GitHub Project, reportar claramente el bloqueo.

Si no se puede determinar la task correcta, no improvisar. Reportar el problema.

Si la task es demasiado grande o ambigua, usar el flujo `Ambiguity and Blocked Handling`.

## Final Response

Al finalizar, responder con:

```md
## Task seleccionada

## Estado del Project

## Branch creada

## Cambios realizados

## Validaciones

## PR creado

## Pendientes / Riesgos
```

## Critical Rules

- Ejecutar una sola task por corrida.
- Priorizar `Ready` por prioridad y fecha de creación.
- Mover a `In Progress` al empezar.
- Crear branch propia.
- Correr checks.
- Crear PR contra `dev/main`.
- Mover a `In Review` cuando el PR esté creado.
- No hacer merge.
- No implementar scope extra.
- No cerrar la tarea como Done automáticamente.
- Ante ambigüedad, marcar `blocked` y comentar qué falta.
