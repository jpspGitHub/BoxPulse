# Feature: Program Assignments

## Goal

Permitir asignar programas de entrenamiento a boxeadores.

## Users

- coach

## Scope

- asignar programas
- visualizar asignaciones
- estados de asignación

## Assignment Statuses

- active
- completed
- canceled

## Business Rules

- un boxer puede tener programa activo
- las asignaciones quedan historizadas
- cancelar no elimina historial

## Acceptance Criteria

- el coach puede asignar programas
- el boxer puede visualizar programa activo
- el historial de asignaciones se mantiene

## Suggested Issues

- [Task] Create assignment flow
- [Task] Persist assignments
- [Task] Add active assignment queries
- [Task] Add assignment history support
