# Feature: Admin User Management

## Goal

Permitir que el administrador gestione coaches y boxers del gimnasio.

## Users

- admin

## Scope

- crear usuarios
- editar usuarios
- activar/desactivar usuarios
- listar usuarios
- asociar usuarios al gimnasio

## User Types

- coach
- boxer

## Business Rules

- solo admins pueden acceder
- usuarios inactivos no pueden ingresar
- email debe ser único
- un usuario pertenece al gimnasio actual

## Acceptance Criteria

- el admin puede crear coaches y boxers
- el admin puede activar/desactivar usuarios
- la lista muestra información básica
- el estado del usuario es visible

## Suggested Issues

- [Task] Create admin users list
- [Task] Create user creation form
- [Task] Add user activation toggle
- [Task] Persist gym membership
