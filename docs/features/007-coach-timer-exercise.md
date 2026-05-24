# Feature: Coach Timer Exercise

## Goal

Permitir que el coach ejecute ejercicios basados en rounds y cronómetro.

## Users

- coach

## Scope

- configuración de rounds
- configuración de descanso
- configuración de preparación inicial
- ejecución automática
- control manual del ejercicio

## Configuration

- round duration
- rest duration
- rounds
- preparation time

## Execution States

- preparation
- round
- rest
- completed
- canceled

## Actions

- pause/resume
- restart round
- next round
- restart exercise
- finish manually
- cancel exercise

## Business Rules

- finalizar guarda resultado
- cancelar no guarda como completado
- descanso inicia automáticamente al terminar round
- siguiente round inicia automáticamente al terminar descanso

## UI Requirements

- timer dominante
- lectura clara a distancia
- botones grandes
- estados visuales claros

## Acceptance Criteria

- el timer funciona correctamente
- el estado cambia automáticamente
- el coach puede intervenir manualmente
- el resultado queda registrado

## Suggested Issues

- [Task] Create timer state machine
- [Task] Build timer execution screen
- [Task] Add round transition handling
- [Task] Add exercise completion persistence
