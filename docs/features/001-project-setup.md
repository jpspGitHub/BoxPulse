# Feature: Project Setup

## Goal

Preparar el monorepo de BoxPulse para desarrollo incremental con web, mobile, API y paquetes compartidos.

## Users

- developers
- Codex

## Scope

- definir estructura base del repositorio
- configurar workspace
- configurar TypeScript
- configurar linting y formatting
- agregar scripts base
- preparar variables de entorno de ejemplo
- dejar carpetas principales listas

## Out of Scope

- implementar features de producto
- conectar Supabase
- crear UI final
- configurar CI avanzado

## Expected Structure

```txt
/api
/apps
  /mobile
  /web
/packages
  /shared
/docs
```

## Technical Requirements

- usar TypeScript como estándar
- mantener documentación en `/docs`
- mantener código compartido en `/packages/shared`
- separar claramente web y mobile

## Acceptance Criteria

- el repo tiene estructura monorepo clara
- los proyectos pueden instalar dependencias
- existen scripts base para desarrollo
- existen convenciones documentadas
- Codex puede identificar áreas de trabajo sin ambigüedad

## Suggested Issues

- [Task] Define package manager and workspace tooling
- [Task] Create base monorepo folders
- [Task] Add TypeScript base config
- [Task] Add lint and format config
- [Task] Add environment example files
