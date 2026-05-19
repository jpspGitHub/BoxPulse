# Feature: Training Programs

## Goal

Permitir que el coach cree programas de entrenamiento reutilizables.

## Users

- coach

## Scope

- crear programas
- crear sesiones
- crear bloques
- configurar timers
- editar programas
- archivar programas

## Program Structure

Program:
- sessions

Session:
- blocks
- timer configuration

## Business Rules

- los programas archivados no se eliminan físicamente
- las sesiones tienen orden
- los bloques tienen orden

## Acceptance Criteria

- el coach puede crear programas
- el coach puede agregar sesiones
- el coach puede agregar bloques
- los programas pueden archivarse

## Suggested Issues

- [Task] Create programs list screen
- [Task] Create program editor
- [Task] Create session editor
- [Task] Create training block editor
