# Agent Prompt: Create GitHub Project Items From Backlog

## Objetivo

Crear items en el GitHub Project de BoxPulse a partir de la documentación existente en el repositorio.

Project URL:

https://github.com/users/jpspGitHub/projects/9/views/1

Repositorio:

`jpspGitHub/BoxPulse`

Branch fuente:

`dev/main`

## Contexto

BoxPulse es una plataforma MVP para gimnasios de boxeo y deportes de combate.

La documentación funcional y técnica está en `/docs`.

Archivos principales a leer:

- `docs/BACKLOG.md`
- `docs/PRIORITIZATION.md`
- `docs/features/*.md`
- `docs/MVP_SPEC.md`
- `docs/PROJECT_CONTEXT.md`

La documentación funcional está en español.

El naming técnico debe mantenerse en inglés.

## Tarea principal

Leer la documentación del proyecto y crear items en el GitHub Project indicado.

Los items deben representar features del MVP, no tareas técnicas pequeñas todavía.

Cada item del Project debe corresponder a una feature documentada en `/docs/features`.

## Fuente de verdad

Usar como fuente principal:

1. `docs/PRIORITIZATION.md` para obtener la lista de features y su prioridad.
2. `docs/features/*.md` para obtener el contenido y alcance de cada feature.
3. `docs/BACKLOG.md` para entender fases y orden sugerido.

No inventar features nuevas.

No modificar prioridades salvo que exista una contradicción evidente entre documentos. Si hay contradicción, dejar una nota en el resultado final.

## Features esperadas

Crear items para estas features si existen en la documentación:

- 001 - Project Setup
- 002 - Shared Domain Package
- 003 - Auth and Roles
- 004 - Admin User Management
- 005 - Admin Dashboard
- 006 - Coach Start Exercise
- 007 - Coach Timer Exercise
- 008 - Coach Repetition Exercise
- 009 - Coach Boxer Tracking
- 010 - Boxer Progress Tracking
- 011 - Boxer Profile Management
- 012 - Boxer Attendance and Workout History
- 013 - Boxer Progress Analytics
- 014 - Training Programs
- 015 - Program Assignments
- 016 - MVP Validation

## Formato de cada item

Cada item debe tener:

### Title

Usar este formato:

```txt
[Feature] <feature number> - <feature name>
```

Ejemplo:

```txt
[Feature] 006 - Coach Start Exercise
```

### Body / Description

Cada item debe incluir:

```md
## Context

Resumen corto de la feature.

## Goal

Objetivo de la feature.

## Scope

Lista de alcance tomada del markdown de la feature.

## Acceptance Criteria

Criterios de aceptación tomados del markdown de la feature.

## Suggested Issues

Lista de issues sugeridas tomadas del markdown de la feature.

## Source Docs

- docs/features/<file>.md
- docs/BACKLOG.md
- docs/PRIORITIZATION.md
```

## Prioridad

La prioridad debe tomarse únicamente desde `docs/PRIORITIZATION.md`.

Valores esperados:

- P0
- P1
- P2

Si el GitHub Project tiene un campo `Priority`, setearlo con ese valor.

Si el campo `Priority` no existe o no es editable desde la herramienta disponible, agregar la prioridad al body del item:

```md
## Priority

P0
```

No usar labels como sustituto de prioridad salvo que el proyecto ya use explícitamente labels para eso.

## Estado inicial

Todos los items deben quedar en estado inicial/backlog.

Si el Project tiene un campo `Status`, usar:

```txt
Backlog
```

Si el campo no existe, no inventar estado.

## Reglas importantes

- No crear código.
- No modificar documentación.
- No crear PR.
- No crear milestones salvo pedido explícito.
- No crear tareas técnicas pequeñas todavía.
- No duplicar items existentes.
- Antes de crear un item, buscar si ya existe un item/issue con el mismo título.
- Si ya existe, no crear duplicado; reportarlo como existente.
- Mantener los títulos consistentes.
- Mantener documentación funcional en español.
- Mantener nombres técnicos en inglés.

## Estrategia recomendada

1. Leer `docs/PRIORITIZATION.md`.
2. Leer `docs/BACKLOG.md`.
3. Leer todos los archivos en `docs/features`.
4. Crear una lista normalizada de features.
5. Verificar si ya existen issues/items equivalentes.
6. Crear un item por feature.
7. Setear prioridad si el Project lo permite.
8. Setear estado inicial `Backlog` si el Project lo permite.
9. Entregar un resumen final.

## Resultado esperado

Al finalizar, reportar:

```md
## Created Items

- [Feature] 001 - Project Setup — P0
- ...

## Existing Items Skipped

- ...

## Warnings

- ...

## Next Recommended Step

Generar issues técnicas pequeñas a partir de cada feature priorizada.
```

## Criterio de éxito

La tarea se considera exitosa si:

- cada feature documentada tiene un item en el Project
- la prioridad está representada
- no hay duplicados
- el resultado final permite pasar luego a generación de issues técnicas
