# AGENTS.md

Este archivo define las reglas de trabajo para Codex y agentes de IA que colaboren en BoxPulse.

## 1. Project Context

BoxPulse es una plataforma MVP para gimnasios de boxeo y deportes de combate.

Antes de implementar, leer:

- `docs/PROJECT_CONTEXT.md`
- `docs/MVP_SPEC.md`
- `docs/BACKLOG.md`
- `docs/PRIORITIZATION.md`
- `docs/ENTITIES.md`
- `docs/API_CONTRACT.md`
- `docs/features/*.md`

La documentación funcional está en español.
El naming técnico debe mantenerse en inglés.

## 2. Package Manager

Usar `pnpm`.

No usar `npm`, `yarn` o `bun` salvo que exista una decisión explícita documentada.

Comandos esperados:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Si alguno de estos scripts todavía no existe, proponerlo o crearlo dentro del alcance de la tarea correspondiente.

## 3. Stack

Stack confirmado:

### Mobile

- Expo
- React Native
- TypeScript
- Expo Router
- NativeWind

### Web

- Next.js
- TypeScript
- TailwindCSS
- shadcn/ui

### Backend

- API-first
- Supabase
- PostgreSQL
- Supabase Auth
- Row Level Security

### Shared

- TypeScript package
- Zod para validaciones
- Tipos compartidos
- Constantes de dominio

## 4. Repository Structure

Estructura esperada:

```txt
/api
/apps
  /mobile
  /web
/packages
  /shared
/docs
/agent
```

No mover carpetas base sin una decisión explícita.

## 5. Branching Strategy

Ramas principales:

```txt
main        -> estable
dev/main    -> desarrollo integrado
feature/*   -> features/tareas
fix/*       -> bugs
docs/*      -> documentación
```

Reglas:

- No trabajar directo sobre `main`.
- No hacer cambios de implementación directo sobre `dev/main`.
- Crear branch para cada tarea.
- Base habitual: `dev/main`.
- PR target habitual: `dev/main`.

## 6. Required Workflow

Para tareas de implementación:

1. Crear branch desde `dev/main`.
2. Leer documentación relevante.
3. Implementar únicamente el alcance pedido.
4. Correr checks.
5. Crear PR contra `dev/main`.
6. Reportar qué se cambió, qué se validó y qué queda pendiente.

No crear PR contra `main` salvo instrucción explícita.

## 7. Commit and PR Language

### Commits

Usar inglés y estilo Conventional Commits cuando aplique:

```txt
feat(mobile): add coach exercise timer screen
fix(api): validate exercise participants
chore(shared): add domain enums
```

### PR Description

Escribir la descripción del PR en español.

Debe incluir:

```md
## Resumen

## Cambios principales

## Validaciones realizadas

## Fuera de alcance

## Notas
```

## 8. Scope Control

Codex debe respetar estrictamente el alcance de la tarea o issue actual.

No implementar features adicionales aunque parezcan obvias.

No hacer refactors grandes sin autorización.

No cambiar arquitectura general sin actualizar primero la documentación correspondiente.

Si algo parece necesario pero está fuera de alcance:

- mencionarlo en el resumen final
- proponerlo como tarea futura
- no implementarlo silenciosamente

## 9. Documentation First

Antes de implementar una feature, revisar su documento en `docs/features`.

Si no existe documentación suficiente:

- no inventar reglas de negocio importantes
- proponer actualización documental
- pedir confirmación si el cambio afecta producto o arquitectura

La fuente de verdad funcional está en:

- `docs/MVP_SPEC.md`
- `docs/features/*.md`
- `docs/ENTITIES.md`
- `docs/API_CONTRACT.md`

## 10. UI, Mockups and Stitch

Codex no debe inventar UX compleja si existe especificación previa.

Fuentes esperadas para UI:

- `docs/features/*.md`
- `docs/MVP_SPEC.md`
- prompts o diseños guardados en `docs/mockups` si existen
- imágenes exportadas o referencias visuales si se agregan al repo
- referencias de Stitch documentadas en `docs/mockups`

Si se agregan mockups:

```txt
docs/mockups
  stitch/
  images/
```

Las imágenes no son obligatorias para implementar, pero si existen deben usarse como referencia visual.

### Stitch Rules

Los proyectos de Stitch deben tratarse como referencia visual y de flujo, no como fuente de arquitectura, backend, contratos API ni reglas de negocio.

Si Codex usa MCP de Stitch o assets exportados desde Stitch:

- debe descargar imágenes/código en `docs/mockups/stitch/<project-slug>/`
- debe documentar el project ID y screen IDs
- debe mantener una tabla de pantallas y su propósito
- debe usar los mockups para layout, jerarquía visual, spacing y flujo
- no debe reemplazar reglas de negocio de `docs/features/*.md`
- no debe modificar entidades por inferencia desde mockups
- no debe modificar endpoints por inferencia desde mockups
- no debe usar código de Stitch como producción sin adaptación

Si un mockup contradice la documentación funcional, seguir este orden de prioridad:

1. `docs/features/*.md`
2. `docs/MVP_SPEC.md`
3. `docs/API_CONTRACT.md`
4. `docs/ENTITIES.md`
5. mockups de Stitch

Si Stitch introduce una idea útil no documentada, reportarla como sugerencia y no implementarla automáticamente.

En ausencia de mockups, priorizar:

- mobile-first
- dark mode
- botones grandes
- alto contraste
- navegación simple
- claridad para uso dentro de gimnasio

## 11. API-first Rule

El proyecto debe seguir enfoque API-first.

Antes de conectar UI a datos:

- revisar `docs/API_CONTRACT.md`
- respetar endpoints definidos
- mantener request/response consistente
- validar payloads con Zod cuando corresponda

Supabase se usa como base tecnológica, pero la arquitectura no debe depender exclusivamente de acceso directo desde UI si la feature requiere lógica de dominio.

## 12. Validation with Zod

Usar Zod para:

- request validation
- shared schemas
- form validation cuando aplique
- validación de tipos de dominio críticos

Ubicación sugerida:

```txt
/packages/shared/src/schemas
/packages/shared/src/types
/packages/shared/src/constants
```

## 13. Testing Strategy

El MVP usa tests livianos.

No buscar cobertura perfecta.

Tests obligatorios para lógica crítica:

- auth/role guards
- exercise mode validation
- timer state machine
- repetition exercise validation
- Zod schemas críticos
- domain helpers en `packages/shared`

Evitar tests frágiles de UI durante etapas tempranas salvo que aporten valor claro.

## 14. Linting and Formatting

Lint obligatorio.

Antes de abrir PR correr, si existen:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Si algún comando falla por causa no relacionada al cambio, documentarlo claramente en el PR.

No ignorar errores de TypeScript o ESLint sin explicación.

## 15. Error Handling

La UI debe mostrar mensajes amigables al usuario.

No exponer errores técnicos internos al usuario final.

Ejemplo:

```txt
No pudimos guardar el ejercicio. Intentá nuevamente.
```

Los detalles técnicos deben registrarse como logs.

## 16. Logging and Verbose Mode

Crear una estrategia de logging controlada por environment variables.

Variable sugerida:

```env
BOXPULSE_VERBOSE_LOGS=false
```

Reglas:

- Si `BOXPULSE_VERBOSE_LOGS=true`, mostrar logs técnicos adicionales en desarrollo.
- Si `BOXPULSE_VERBOSE_LOGS=false`, mantener logs mínimos.
- Nunca loguear passwords, tokens, secretos ni información sensible.
- Los logs deben ayudar a debuggear sin contaminar la experiencia de usuario.

Ver también:

- `docs/LOGGING.md`

## 17. Environment Variables

Toda variable nueva debe documentarse en `.env.example`.

No commitear `.env` reales.

No hardcodear secretos.

Variables esperadas inicialmente:

```env
BOXPULSE_VERBOSE_LOGS=false
```

Otras variables deberán agregarse según stack y servicios.

## 18. Security and Access Control

Toda feature debe respetar roles:

- admin
- coach
- boxer

Reglas mínimas:

- un boxer solo ve sus propios datos
- un coach ve datos del gimnasio correspondiente
- un admin gestiona usuarios del gimnasio
- no confiar únicamente en validaciones de frontend
- aplicar controles en API y/o RLS

## 19. Data Model

Antes de crear o modificar entidades:

- revisar `docs/ENTITIES.md`
- revisar `docs/API_CONTRACT.md`
- mantener consistencia entre DB, API y shared types

No renombrar entidades o propiedades sin actualizar documentación.

## 20. Definition of Done

Una tarea se considera terminada cuando:

- cumple criterios de aceptación
- respeta scope
- compila o se documenta por qué no puede compilar
- pasa lint o se documenta bloqueo
- incluye tests si toca lógica crítica
- actualiza documentación si cambia contrato, entidades o reglas
- abre PR contra `dev/main`
- PR description está en español

## 21. Do Not Do

No hacer:

- features fuera de scope
- cambios directos a `main`
- commits con secretos
- hacks sin explicación
- `any` innecesario en TypeScript
- lógica duplicada entre web y mobile si puede vivir en shared
- mezclar español e inglés en nombres técnicos
- modificar documentación y código no relacionado en el mismo PR salvo que sea necesario

## 22. Agent Final Response

Al terminar una tarea, reportar:

```md
## Hecho

## Validaciones

## Archivos modificados

## Pendientes / Riesgos

## PR
```

Si no se pudo completar algo, decirlo claramente.
