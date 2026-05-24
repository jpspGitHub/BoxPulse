# BoxPulse Logging Guidelines

Este documento define reglas básicas de logging para el MVP de BoxPulse.

## Objetivos

- facilitar debugging
- evitar contaminación visual innecesaria
- proteger información sensible
- permitir modo verbose controlado

## Environment Variable

```env
BOXPULSE_VERBOSE_LOGS=false
```

## Verbose Mode

### `BOXPULSE_VERBOSE_LOGS=false`

Comportamiento esperado:

- logs mínimos
- errores importantes
- warnings relevantes
- evitar ruido innecesario

### `BOXPULSE_VERBOSE_LOGS=true`

Comportamiento esperado:

- logs detallados
- request lifecycle
- validaciones
- timers y estados
- debug de navegación si aplica
- información útil para desarrollo

## Nunca Loguear

Nunca imprimir:

- passwords
- access tokens
- refresh tokens
- secretos
- API keys
- información médica sensible
- datos privados innecesarios

## Logging Style

Preferir logs estructurados.

Ejemplo:

```txt
[ExerciseTimer] Transitioning from ROUND to REST
```

Evitar:

```txt
aca paso algo raro xd
```

Sí, parece obvio. Igual termina pasando.

## Frontend

La UI debe mostrar mensajes amigables.

Ejemplo:

```txt
No pudimos iniciar el ejercicio.
Intentá nuevamente.
```

No mostrar stack traces al usuario.

## Backend/API

Errores técnicos deben registrarse con suficiente contexto:

- endpoint
- actor
- entidad afectada
- tipo de error

Sin exponer secretos.

## Future Direction

A futuro puede integrarse:

- Sentry
- Logtail
- Datadog
- OpenTelemetry

Fuera del alcance del MVP inicial.
