# Feature: Auth and Roles

## Goal

Implementar autenticación y separación de experiencias por rol.

## Users

- admin
- coach
- boxer

## Scope

- login
- logout
- persistencia de sesión
- protección de rutas
- roles
- usuarios activos/inactivos

## Roles

- admin
- coach
- boxer

## Business Rules

- un usuario inactivo no puede ingresar
- cada usuario accede solo a funcionalidades permitidas
- mobile debe detectar correctamente el rol
- web admin debe proteger acceso por rol

## Technical Direction

- Supabase Auth
- JWT/session handling
- role validation
- route guards

## Acceptance Criteria

- login funciona en web y mobile
- sesión persiste correctamente
- usuarios sin permisos no pueden acceder
- el rol determina la experiencia visible

## Suggested Issues

- [Task] Configure Supabase auth
- [Task] Create auth session provider
- [Task] Implement role validation
- [Task] Protect admin routes
- [Task] Protect mobile coach and boxer routes
