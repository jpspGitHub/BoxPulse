# Feature: Shared Domain Package

## Goal

Crear un paquete compartido para centralizar tipos, constantes y validaciones de dominio usadas por web, mobile y API.

## Users

- developers
- Codex

## Scope

- tipos base del dominio
- enums compartidos
- constantes de roles
- constantes de estados
- validaciones reutilizables
- contratos base cuando corresponda

## Out of Scope

- lógica de UI
- lógica específica de una app
- integración directa con Supabase
- servicios de datos

## Domain Areas

- users
- roles
- gyms
- coaches
- boxers
- exercises
- timer configs
- repetition configs
- progress entries
- attendance records
- training programs

## Business Rules

- el paquete compartido debe mantenerse pequeño y estable
- no debe convertirse en un contenedor genérico de utilidades
- app-specific behavior debe vivir en cada app

## Acceptance Criteria

- existen tipos compartidos para roles y entidades principales
- existen enums para estados principales
- web y mobile pueden importar desde `packages/shared`
- el paquete compila de forma independiente

## Suggested Issues

- [Task] Create shared package structure
- [Task] Define role and status enums
- [Task] Define core domain types
- [Task] Add shared validation schemas
- [Task] Export package entrypoints
