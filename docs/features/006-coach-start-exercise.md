# Feature: Coach Start Exercise

## Goal

Permitir que el coach inicie rápidamente un ejercicio grupal desde mobile.

## Users

- coach

## Scope

- iniciar ejercicio
- seleccionar participantes
- seleccionar tipo de entrenamiento
- seleccionar modalidad
- navegar hacia ejecución

## User Flow

1. Coach toca `Iniciar ejercicio`.
2. Selecciona boxeadores participantes.
3. Selecciona tipo de entrenamiento.
4. Selecciona modalidad:
   - timer
   - repetitions
5. Navega hacia configuración del ejercicio.

## Exercise Types

- bag_work
- sparring
- abs
- jump_rope
- shadow_boxing
- pads
- defensive_technique
- conditioning
- strength
- custom

## UI Requirements

- botones grandes
- flujo rápido
- navegación simple
- usable caminando por el gimnasio
- mínimo número de taps

## Business Rules

- no puede iniciarse ejercicio sin participantes
- debe existir tipo de entrenamiento seleccionado
- el coach puede cancelar el flujo antes de iniciar

## Acceptance Criteria

- el coach puede seleccionar participantes
- el coach puede seleccionar modalidad
- el flujo navega correctamente
- el estado se mantiene entre pantallas

## Suggested Issues

- [Task] Create participant selection screen
- [Task] Create exercise type selector
- [Task] Create exercise mode selector
- [Task] Persist exercise draft state
