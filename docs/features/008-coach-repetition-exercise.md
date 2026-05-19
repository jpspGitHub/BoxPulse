# Feature: Coach Repetition Exercise

## Goal

Permitir que el coach ejecute ejercicios basados en repeticiones.

## Users

- coach

## Scope

- configurar repeticiones
- configurar series
- medir duración total
- finalizar ejercicio
- cancelar ejercicio

## Exercise Examples

- abdominales
- flexiones
- fuerza
- técnica

## Execution

La pantalla debe mostrar:

- ejercicio seleccionado
- participantes
- repeticiones configuradas
- timer ascendente
- estado actual

## Business Rules

- el timer inicia al comenzar ejercicio
- reiniciar vuelve el contador a cero
- finalizar guarda resultado
- cancelar no guarda resultado

## Acceptance Criteria

- el coach puede configurar repeticiones
- el timer ascendente funciona
- el coach puede finalizar o cancelar

## Suggested Issues

- [Task] Create repetition config screen
- [Task] Build repetition execution screen
- [Task] Add exercise duration timer
- [Task] Persist repetition exercise results
