# Feature: Boxer Progress Tracking

## Goal

Permitir que el boxeador registre y visualice su progreso físico.

## Users

- boxer
- coach

## Scope

- registrar métricas
- historial de progreso
- visualización de evolución
- acceso del coach al progreso

## Metrics

- weight
- height
- waist
- chest
- arm
- leg
- body_fat_percentage
- notes

## User Flow

1. Boxer entra a `Registrar progreso`.
2. Completa métricas.
3. Guarda el registro.
4. Visualiza historial.
5. Consulta evolución.

## Business Rules

- los registros quedan historizados
- el boxer solo puede editar sus propios datos
- el coach puede visualizar progreso

## UI Requirements

- formulario rápido
- usable después del entrenamiento
- gráficos simples
- cards claras

## Acceptance Criteria

- el boxer puede crear registros
- el historial se visualiza correctamente
- la evolución es visible
- el coach puede consultar progreso

## Suggested Issues

- [Task] Create progress entry form
- [Task] Persist progress entries
- [Task] Build progress history screen
- [Task] Add progress charts
