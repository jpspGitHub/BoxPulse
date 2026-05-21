# Agent Prompt: Execute Next Ready Task

## Objetivo

Ejecutar exactamente una tarea lista para desarrollo desde el GitHub Project de BoxPulse.

El agente debe:

1. Buscar tareas en el GitHub Project.
2. Filtrar solo tareas con estado `Ready`.
3. Excluir cualquier tarea que tenga labels.
4. Tomar una sola tarea según prioridad y fecha de creación.
5. Sincronizar `dev/main` con remoto antes de crear branch.
6. Mover la tarea a `In Progress` cuando empiece a trabajar.
7. Desarrollarla en una branch aparte relacionada a la tarea.
8. Correr las validaciones necesarias.
9. Crear un Pull Request contra `dev/main` relacionado a la tarea.
10. Mover la tarea a `In Review` cuando el PR quede creado.
11. No hacer merge del PR. El merge es manual.

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

Tomar solamente tareas que no tengan ninguna label.

Excluir tareas que tengan cualquier label, incluyendo pero no limitado a:

- `Missin information`
- `To Rock Break`
- `blocked`
- cualquier otra label

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
Ready -> Blocked
```

Reglas:

- Solo tomar tareas en `Ready` y sin labels.
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

## Branch and PR Linking Rules

Toda branch y todo PR deben quedar relacionados con la tarea trabajada.

### Branch linking

La branch debe incluir el número de issue/task si existe.

Formato recomendado:

```txt
feature/<issue-number>-<task-slug>
fix/<issue-number>-<task-slug>
docs/<issue-number>-<task-slug>
```

Ejemplos:

```txt
feature/6-bootstrap-environment-validation
feature/12-coach-timer-exercise
fix/18-api-healthcheck
```

Si no existe issue number, usar el project item id o un slug claro.

### PR linking

El PR debe mencionar explícitamente la issue/task relacionada.

En la descripción del PR agregar:

```md
Closes #<issue-number>
```

solo si el PR debe cerrar la issue al hacer merge.

Si la issue no debe cerrarse automáticamente, usar:

```md
Related to #<issue-number>
```

Para features grandes o project items que agrupan varias tareas, preferir `Related to`.

### Comments

Después de crear el PR, agregar comentario en la issue/item:

```md
PR creado: <PR URL>

Estado esperado: `In Review`.
```

Si no se puede comentar, reportarlo en la respuesta final.

## Ambiguity, Missing Information and Blocked Handling

Este flujo aplica solo cuando falta información o hay ambigüedad que impide continuar con seguridad.

No aplica a tareas grandes que necesitan ser divididas.

Si la task tiene información ambigua, contradictoria o falta información necesaria:

1. No implementar.
2. No crear branch de desarrollo.
3. Mover la task a estado `Blocked` si el Project lo permite.
4. Agregar label `Missin information`.
5. Si la label `Missin information` no existe, crearla si la herramienta lo permite.
6. Agregar un comentario explicando exactamente qué información falta.
7. Reportar el bloqueo en la respuesta final.

Comentario sugerido:

```md
El agente no puede avanzar de forma segura porque falta información o existe ambigüedad en la tarea.

Información necesaria para continuar:

- ...

Cuando esta información esté definida, quitar la label `Missin information` y volver a dejar la tarea en `Ready`.
```

No improvisar decisiones funcionales importantes.

## Too Large / Needs Breakdown Handling

Este flujo aplica cuando la tarea es demasiado grande para implementarse de forma segura en una sola ejecución y necesita ser dividida.

Si la task es demasiado grande o necesita ser desglosada:

1. No implementar.
2. No crear branch de desarrollo.
3. Mantener la task en estado `Ready`.
4. Agregar label `To Rock Break`.
5. Si la label `To Rock Break` no existe, crearla si la herramienta lo permite.
6. Agregar un comentario explicando por qué necesita dividirse y sugerir posibles subtareas.
7. Reportar que debe ser procesada por el agente de desglose.

Comentario sugerido:

```md
La tarea es demasiado grande para una sola ejecución segura del agente y necesita ser dividida.

Sugerencia inicial de desglose:

- ...

Mantengo la tarea en `Ready` y agrego la label `To Rock Break` para que sea procesada por el agente de desglose.
```

## Git Sync Rules

Antes de crear una branch o modificar archivos, el agente debe sincronizar la rama base con remoto.

Comandos esperados:

```bash
git checkout dev/main
git pull origin dev/main
```

Reglas:

- No crear branch desde una versión desactualizada de `dev/main`.
- Si `git pull` falla, no continuar.
- Si hay cambios locales sin commitear, no pisarlos; reportar el bloqueo.
- La branch de trabajo debe crearse después del pull exitoso.

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

Crear branch desde `dev/main` después de hacer pull.

Formato de branch:

```txt
feature/<issue-number-or-task-slug>
fix/<issue-number-or-task-slug>
docs/<issue-number-or-task-slug>
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
- Issue/Item: <issue url or project item url>

## Relación con la tarea

Related to #<issue-number>

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

Si no hay tareas en `Ready` sin labels, terminar sin hacer cambios y reportar:

```md
No hay tareas en estado Ready sin labels.
```

Si no se puede acceder al GitHub Project, reportar claramente el bloqueo.

Si no se puede determinar la task correcta, no improvisar. Reportar el problema.

Si `git pull origin dev/main` falla, no continuar y reportar el bloqueo.

Si falta información o hay ambigüedad, usar `Ambiguity, Missing Information and Blocked Handling`.

Si la task es demasiado grande y necesita dividirse, usar `Too Large / Needs Breakdown Handling`.

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
- Tomar solo tasks en `Ready` y sin labels.
- Priorizar `Ready` por prioridad y fecha de creación.
- Hacer `git pull origin dev/main` antes de crear branch.
- Mover a `In Progress` al empezar.
- Crear branch propia desde `dev/main` actualizado.
- Linkear branch y PR con la tarea.
- Correr checks.
- Crear PR contra `dev/main`.
- Mover a `In Review` cuando el PR esté creado.
- No hacer merge.
- No implementar scope extra.
- No cerrar la tarea como Done automáticamente.
- Ante ambigüedad o falta de información, mover a `Blocked` y agregar label `Missin information`.
- Ante tarea demasiado grande, mantener en `Ready` y agregar label `To Rock Break`.
