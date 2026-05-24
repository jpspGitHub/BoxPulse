# BoxPulse API Contract

Este documento define los endpoints necesarios para el MVP de BoxPulse.

La documentación funcional está en español, pero los paths, payloads y nombres técnicos se mantienen en inglés.

## 1. Base URL

```txt
/api/v1
```

## 2. Conventions

- JSON request and response bodies.
- ISO 8601 timestamps.
- `snake_case` para propiedades de base de datos.
- `camelCase` puede usarse en frontend si se define mapping explícito.
- List endpoints deben soportar paginación cuando aplique.
- Todos los endpoints privados requieren autenticación.
- La autorización depende del rol: `admin`, `coach`, `boxer`.

## 3. Authentication

Dirección inicial: Supabase Auth.

Los endpoints custom pueden asumir el uso de:

```http
Authorization: Bearer <access_token>
```

## 4. Error Shape

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": {}
  }
}
```

## 5. Common Pagination

Para endpoints de listado:

```http
GET /resource?page=1&page_size=20
```

Respuesta sugerida:

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "page_size": 20,
    "total": 100
  }
}
```

---

# 6. Health

| Method | Path      | Auth | Roles  | Description                   |
| ------ | --------- | ---- | ------ | ----------------------------- |
| GET    | `/health` | no   | public | Verifica estado del servicio. |

---

# 7. Auth / Session

> Nota: si Supabase Auth cubre estos flujos directamente, estos endpoints pueden implementarse como wrappers o documentarse como client-side auth flows.

| Method | Path                    | Auth | Roles  | Description                              |
| ------ | ----------------------- | ---- | ------ | ---------------------------------------- |
| POST   | `/auth/login`           | no   | public | Inicia sesión.                           |
| POST   | `/auth/logout`          | yes  | all    | Cierra sesión.                           |
| GET    | `/auth/me`              | yes  | all    | Devuelve usuario actual, rol y gimnasio. |
| POST   | `/auth/change-password` | yes  | all    | Cambia contraseña del usuario actual.    |

## POST /auth/login

### Request

```json
{
  "email": "coach@gym.com",
  "password": "secret"
}
```

### Response

```json
{
  "access_token": "jwt",
  "user": {
    "id": "uuid",
    "email": "coach@gym.com",
    "role": "coach",
    "gym_id": "uuid",
    "is_active": true
  }
}
```

## GET /auth/me

### Response

```json
{
  "id": "uuid",
  "email": "coach@gym.com",
  "role": "coach",
  "gym_id": "uuid",
  "profile": {
    "id": "uuid",
    "first_name": "Nicolas",
    "last_name": "Cabrera",
    "avatar_url": null
  }
}
```

---

# 8. Gyms

| Method | Path            | Auth | Roles               | Description                             |
| ------ | --------------- | ---- | ------------------- | --------------------------------------- |
| GET    | `/gyms/current` | yes  | admin, coach, boxer | Obtiene el gimnasio actual del usuario. |
| PATCH  | `/gyms/current` | yes  | admin               | Actualiza datos básicos del gimnasio.   |

## GET /gyms/current

### Response

```json
{
  "id": "uuid",
  "name": "RoundLab Boxing Gym",
  "slug": "roundlab",
  "created_at": "2026-05-19T00:00:00Z",
  "updated_at": "2026-05-19T00:00:00Z"
}
```

---

# 9. Admin Users

Gestión de usuarios del gimnasio desde web admin.

| Method | Path                                | Auth | Roles | Description                     |
| ------ | ----------------------------------- | ---- | ----- | ------------------------------- |
| GET    | `/admin/users`                      | yes  | admin | Lista usuarios del gimnasio.    |
| POST   | `/admin/users`                      | yes  | admin | Crea usuario coach o boxer.     |
| GET    | `/admin/users/{user_id}`            | yes  | admin | Obtiene detalle de usuario.     |
| PATCH  | `/admin/users/{user_id}`            | yes  | admin | Edita datos básicos de usuario. |
| POST   | `/admin/users/{user_id}/activate`   | yes  | admin | Activa usuario.                 |
| POST   | `/admin/users/{user_id}/deactivate` | yes  | admin | Desactiva usuario.              |

## POST /admin/users

### Request

```json
{
  "email": "boxer@gym.com",
  "role": "boxer",
  "first_name": "Martin",
  "last_name": "Rodriguez",
  "phone": "+59899999999",
  "level": "intermediate"
}
```

### Response

```json
{
  "id": "uuid",
  "email": "boxer@gym.com",
  "role": "boxer",
  "is_active": true,
  "profile": {
    "id": "uuid",
    "first_name": "Martin",
    "last_name": "Rodriguez",
    "phone": "+59899999999",
    "level": "intermediate"
  }
}
```

---

# 10. Coach Profiles

| Method | Path                  | Auth | Roles        | Description                 |
| ------ | --------------------- | ---- | ------------ | --------------------------- |
| GET    | `/coaches`            | yes  | admin        | Lista coaches del gimnasio. |
| GET    | `/coaches/{coach_id}` | yes  | admin, coach | Obtiene detalle de coach.   |
| PATCH  | `/coaches/{coach_id}` | yes  | admin, coach | Actualiza perfil de coach.  |

---

# 11. Boxer Profiles

| Method | Path                 | Auth | Roles        | Description                                    |
| ------ | -------------------- | ---- | ------------ | ---------------------------------------------- |
| GET    | `/boxers`            | yes  | admin, coach | Lista boxeadores del gimnasio.                 |
| GET    | `/boxers/{boxer_id}` | yes  | admin, coach | Obtiene detalle de boxeador.                   |
| PATCH  | `/boxers/{boxer_id}` | yes  | admin, coach | Actualiza datos deportivos del boxeador.       |
| GET    | `/boxers/me`         | yes  | boxer        | Obtiene perfil del boxeador actual.            |
| PATCH  | `/boxers/me`         | yes  | boxer        | Actualiza perfil personal del boxeador actual. |
| POST   | `/boxers/me/avatar`  | yes  | boxer        | Actualiza imagen/avatar del boxeador.          |

## GET /boxers/{boxer_id}

### Response

```json
{
  "id": "uuid",
  "user_id": "uuid",
  "gym_id": "uuid",
  "first_name": "Martin",
  "last_name": "Rodriguez",
  "phone": "+59899999999",
  "avatar_url": null,
  "birth_date": "1995-08-12",
  "height": 1.78,
  "initial_weight": 76.0,
  "level": "intermediate",
  "notes": "Buen trabajo de bolsa",
  "created_at": "2026-05-19T00:00:00Z",
  "updated_at": "2026-05-19T00:00:00Z"
}
```

---

# 12. Training Programs

| Method | Path                                       | Auth | Roles        | Description                   |
| ------ | ------------------------------------------ | ---- | ------------ | ----------------------------- |
| GET    | `/training-programs`                       | yes  | admin, coach | Lista programas del gimnasio. |
| POST   | `/training-programs`                       | yes  | coach        | Crea programa.                |
| GET    | `/training-programs/{program_id}`          | yes  | admin, coach | Obtiene detalle de programa.  |
| PATCH  | `/training-programs/{program_id}`          | yes  | coach        | Edita programa.               |
| POST   | `/training-programs/{program_id}/archive`  | yes  | coach        | Archiva programa.             |
| POST   | `/training-programs/{program_id}/activate` | yes  | coach        | Activa programa.              |

## POST /training-programs

### Request

```json
{
  "name": "Preparacion amateur",
  "description": "Programa inicial para competencia amateur",
  "level": "intermediate",
  "status": "draft"
}
```

---

# 13. Training Sessions

| Method | Path                                       | Auth | Roles               | Description                               |
| ------ | ------------------------------------------ | ---- | ------------------- | ----------------------------------------- |
| GET    | `/training-programs/{program_id}/sessions` | yes  | admin, coach, boxer | Lista sesiones de un programa.            |
| POST   | `/training-programs/{program_id}/sessions` | yes  | coach               | Crea sesión dentro de programa.           |
| GET    | `/training-sessions/{session_id}`          | yes  | admin, coach, boxer | Obtiene detalle de sesión.                |
| PATCH  | `/training-sessions/{session_id}`          | yes  | coach               | Edita sesión.                             |
| DELETE | `/training-sessions/{session_id}`          | yes  | coach               | Elimina sesión si no tiene uso histórico. |

## POST /training-programs/{program_id}/sessions

### Request

```json
{
  "name": "Tecnica basica",
  "description": "Trabajo técnico inicial",
  "order_index": 1
}
```

---

# 14. Training Blocks

| Method | Path                                     | Auth | Roles               | Description                               |
| ------ | ---------------------------------------- | ---- | ------------------- | ----------------------------------------- |
| GET    | `/training-sessions/{session_id}/blocks` | yes  | admin, coach, boxer | Lista bloques de una sesión.              |
| POST   | `/training-sessions/{session_id}/blocks` | yes  | coach               | Crea bloque.                              |
| PATCH  | `/training-blocks/{block_id}`            | yes  | coach               | Edita bloque.                             |
| DELETE | `/training-blocks/{block_id}`            | yes  | coach               | Elimina bloque si no tiene uso histórico. |

## POST /training-sessions/{session_id}/blocks

### Request

```json
{
  "type": "bag_work",
  "name": "Bolsa",
  "description": "Trabajo de combinaciones 1-2 y salida lateral",
  "duration_seconds": 180,
  "order_index": 2,
  "coach_notes": "Priorizar técnica antes que potencia"
}
```

---

# 15. Timer Configs for Planned Sessions

| Method | Path                                           | Auth | Roles               | Description                              |
| ------ | ---------------------------------------------- | ---- | ------------------- | ---------------------------------------- |
| GET    | `/training-sessions/{session_id}/timer-config` | yes  | admin, coach, boxer | Obtiene configuración de timer.          |
| PUT    | `/training-sessions/{session_id}/timer-config` | yes  | coach               | Crea o reemplaza configuración de timer. |

## PUT /training-sessions/{session_id}/timer-config

### Request

```json
{
  "rounds": 5,
  "round_duration_seconds": 180,
  "rest_duration_seconds": 60,
  "preparation_seconds": 10
}
```

---

# 16. Program Assignments

| Method | Path                                            | Auth | Roles               | Description                                  |
| ------ | ----------------------------------------------- | ---- | ------------------- | -------------------------------------------- |
| GET    | `/program-assignments`                          | yes  | admin, coach        | Lista asignaciones.                          |
| POST   | `/program-assignments`                          | yes  | coach               | Asigna programa a boxeador.                  |
| GET    | `/program-assignments/{assignment_id}`          | yes  | admin, coach, boxer | Obtiene detalle de asignación.               |
| PATCH  | `/program-assignments/{assignment_id}`          | yes  | coach               | Actualiza asignación.                        |
| POST   | `/program-assignments/{assignment_id}/complete` | yes  | coach               | Marca asignación como completada.            |
| POST   | `/program-assignments/{assignment_id}/cancel`   | yes  | coach               | Cancela asignación.                          |
| GET    | `/boxers/me/program-assignments`                | yes  | boxer               | Lista asignaciones del boxeador actual.      |
| GET    | `/boxers/me/active-program`                     | yes  | boxer               | Obtiene programa activo del boxeador actual. |

## POST /program-assignments

### Request

```json
{
  "program_id": "uuid",
  "boxer_id": "uuid",
  "start_date": "2026-05-19"
}
```

---

# 17. Exercises

Ejercicios reales iniciados por un coach desde mobile.

| Method | Path                               | Auth | Roles               | Description                              |
| ------ | ---------------------------------- | ---- | ------------------- | ---------------------------------------- |
| GET    | `/exercises`                       | yes  | admin, coach        | Lista ejercicios del gimnasio.           |
| POST   | `/exercises`                       | yes  | coach               | Crea ejercicio en estado pendiente.      |
| GET    | `/exercises/{exercise_id}`         | yes  | admin, coach, boxer | Obtiene detalle de ejercicio.            |
| PATCH  | `/exercises/{exercise_id}`         | yes  | coach               | Actualiza datos generales del ejercicio. |
| POST   | `/exercises/{exercise_id}/start`   | yes  | coach               | Inicia ejercicio.                        |
| POST   | `/exercises/{exercise_id}/finish`  | yes  | coach               | Finaliza y guarda resultado.             |
| POST   | `/exercises/{exercise_id}/cancel`  | yes  | coach               | Cancela ejercicio.                       |
| POST   | `/exercises/{exercise_id}/restart` | yes  | coach               | Reinicia ejercicio completo.             |

## POST /exercises

### Request

```json
{
  "type": "bag_work",
  "mode": "timer",
  "participant_ids": ["boxer_uuid_1", "boxer_uuid_2"],
  "notes": "Trabajo grupal de bolsa"
}
```

### Response

```json
{
  "id": "uuid",
  "gym_id": "uuid",
  "coach_id": "uuid",
  "type": "bag_work",
  "mode": "timer",
  "status": "pending",
  "participants": [
    {
      "boxer_id": "boxer_uuid_1",
      "status": "selected"
    }
  ],
  "created_at": "2026-05-19T00:00:00Z",
  "updated_at": "2026-05-19T00:00:00Z"
}
```

---

# 18. Exercise Participants

| Method | Path                                               | Auth | Roles               | Description                        |
| ------ | -------------------------------------------------- | ---- | ------------------- | ---------------------------------- |
| GET    | `/exercises/{exercise_id}/participants`            | yes  | admin, coach, boxer | Lista participantes.               |
| POST   | `/exercises/{exercise_id}/participants`            | yes  | coach               | Agrega participantes.              |
| DELETE | `/exercises/{exercise_id}/participants/{boxer_id}` | yes  | coach               | Quita participante.                |
| PATCH  | `/exercises/{exercise_id}/participants/{boxer_id}` | yes  | coach               | Actualiza estado del participante. |

## POST /exercises/{exercise_id}/participants

### Request

```json
{
  "boxer_ids": ["uuid", "uuid"]
}
```

---

# 19. Timer Exercises

Endpoints específicos para ejercicios por cronómetro.

| Method | Path                                           | Auth | Roles               | Description                                            |
| ------ | ---------------------------------------------- | ---- | ------------------- | ------------------------------------------------------ |
| PUT    | `/exercises/{exercise_id}/timer-config`        | yes  | coach               | Crea o reemplaza configuración de timer del ejercicio. |
| GET    | `/exercises/{exercise_id}/timer-config`        | yes  | admin, coach, boxer | Obtiene configuración de timer del ejercicio.          |
| POST   | `/exercises/{exercise_id}/timer/pause`         | yes  | coach               | Pausa timer.                                           |
| POST   | `/exercises/{exercise_id}/timer/resume`        | yes  | coach               | Continúa timer.                                        |
| POST   | `/exercises/{exercise_id}/timer/restart-round` | yes  | coach               | Reinicia round actual.                                 |
| POST   | `/exercises/{exercise_id}/timer/next-round`    | yes  | coach               | Pasa al siguiente round.                               |

## PUT /exercises/{exercise_id}/timer-config

### Request

```json
{
  "rounds": 5,
  "round_duration_seconds": 180,
  "rest_duration_seconds": 60,
  "preparation_seconds": 10
}
```

## Timer State Response

```json
{
  "exercise_id": "uuid",
  "state": "round",
  "current_round": 2,
  "total_rounds": 5,
  "remaining_seconds": 143,
  "is_paused": false
}
```

---

# 20. Repetition Exercises

Endpoints específicos para ejercicios por repeticiones.

| Method | Path                                                 | Auth | Roles               | Description                                     |
| ------ | ---------------------------------------------------- | ---- | ------------------- | ----------------------------------------------- |
| PUT    | `/exercises/{exercise_id}/repetition-config`         | yes  | coach               | Crea o reemplaza configuración de repeticiones. |
| GET    | `/exercises/{exercise_id}/repetition-config`         | yes  | admin, coach, boxer | Obtiene configuración de repeticiones.          |
| POST   | `/exercises/{exercise_id}/repetitions/restart-timer` | yes  | coach               | Reinicia timer ascendente del ejercicio.        |

## PUT /exercises/{exercise_id}/repetition-config

### Request

```json
{
  "repetitions": 50,
  "sets": 3
}
```

---

# 21. Workout Completions

| Method | Path                                     | Auth | Roles        | Description                                |
| ------ | ---------------------------------------- | ---- | ------------ | ------------------------------------------ |
| GET    | `/workout-completions`                   | yes  | admin, coach | Lista entrenamientos completados.          |
| POST   | `/workout-completions`                   | yes  | coach, boxer | Crea registro de entrenamiento completado. |
| GET    | `/boxers/{boxer_id}/workout-completions` | yes  | admin, coach | Lista completados de un boxeador.          |
| GET    | `/boxers/me/workout-completions`         | yes  | boxer        | Lista completados del boxeador actual.     |

## POST /workout-completions

### Request

```json
{
  "assignment_id": "uuid",
  "session_id": "uuid",
  "boxer_id": "uuid",
  "exercise_id": "uuid",
  "completed_at": "2026-05-19T20:30:00Z",
  "notes": "Completado correctamente"
}
```

---

# 22. Progress Entries

| Method | Path                                     | Auth | Roles        | Description                                |
| ------ | ---------------------------------------- | ---- | ------------ | ------------------------------------------ |
| GET    | `/boxers/{boxer_id}/progress-entries`    | yes  | admin, coach | Lista progreso de un boxeador.             |
| GET    | `/boxers/me/progress-entries`            | yes  | boxer        | Lista progreso del boxeador actual.        |
| POST   | `/boxers/me/progress-entries`            | yes  | boxer        | Crea registro de progreso propio.          |
| PATCH  | `/boxers/me/progress-entries/{entry_id}` | yes  | boxer        | Edita registro propio.                     |
| DELETE | `/boxers/me/progress-entries/{entry_id}` | yes  | boxer        | Elimina registro propio si está permitido. |

## POST /boxers/me/progress-entries

### Request

```json
{
  "weight": 74.5,
  "height": 1.78,
  "waist": 82,
  "chest": 98,
  "arm": 34,
  "leg": 58,
  "body_fat_percentage": 16.5,
  "notes": "Me senti bien despues del entrenamiento",
  "entry_date": "2026-05-19"
}
```

---

# 23. Attendance Records

| Method | Path                                    | Auth | Roles        | Description                       |
| ------ | --------------------------------------- | ---- | ------------ | --------------------------------- |
| GET    | `/attendance-records`                   | yes  | admin, coach | Lista asistencias del gimnasio.   |
| POST   | `/attendance-records`                   | yes  | admin, coach | Crea asistencia manual.           |
| GET    | `/boxers/{boxer_id}/attendance-records` | yes  | admin, coach | Lista asistencias de un boxeador. |
| GET    | `/boxers/me/attendance-records`         | yes  | boxer        | Lista asistencias propias.        |

## POST /attendance-records

### Request

```json
{
  "boxer_id": "uuid",
  "source": "manual",
  "attended_at": "2026-05-19T19:00:00Z"
}
```

---

# 24. Coach Notes / Observations

> Esta sección puede implementarse como entidad separada o como parte de perfiles/ejercicios. Para el MVP, se documenta el contrato previsto.

| Method | Path                             | Auth | Roles        | Description                                   |
| ------ | -------------------------------- | ---- | ------------ | --------------------------------------------- |
| GET    | `/boxers/{boxer_id}/coach-notes` | yes  | admin, coach | Lista observaciones del coach.                |
| POST   | `/boxers/{boxer_id}/coach-notes` | yes  | coach        | Crea observación.                             |
| PATCH  | `/coach-notes/{note_id}`         | yes  | coach        | Edita observación propia.                     |
| DELETE | `/coach-notes/{note_id}`         | yes  | coach        | Elimina observación propia si está permitido. |

## POST /boxers/{boxer_id}/coach-notes

### Request

```json
{
  "note": "Mejorar guardia al salir de combinaciones",
  "visibility": "coach_only"
}
```

---

# 25. Dashboards

## Admin Dashboard

| Method | Path                                | Auth | Roles | Description                   |
| ------ | ----------------------------------- | ---- | ----- | ----------------------------- |
| GET    | `/dashboards/admin/summary`         | yes  | admin | Resumen general del gimnasio. |
| GET    | `/dashboards/admin/recent-activity` | yes  | admin | Actividad reciente.           |

### GET /dashboards/admin/summary

```json
{
  "total_users": 24,
  "total_coaches": 3,
  "total_boxers": 21,
  "active_programs": 5,
  "completed_exercises_this_week": 18,
  "attendance_this_week": 42
}
```

## Coach Dashboard

| Method | Path                                | Auth | Roles | Description                       |
| ------ | ----------------------------------- | ---- | ----- | --------------------------------- |
| GET    | `/dashboards/coach/summary`         | yes  | coach | Resumen operativo del coach.      |
| GET    | `/dashboards/coach/recent-activity` | yes  | coach | Actividad reciente de boxeadores. |

### GET /dashboards/coach/summary

```json
{
  "active_boxers": 12,
  "exercises_completed_this_week": 8,
  "recent_progress_entries": 5,
  "attendance_this_week": 19
}
```

## Boxer Dashboard

| Method | Path                                   | Auth | Roles | Description                                 |
| ------ | -------------------------------------- | ---- | ----- | ------------------------------------------- |
| GET    | `/dashboards/boxer/summary`            | yes  | boxer | Resumen personal del boxeador.              |
| GET    | `/dashboards/boxer/progress-analytics` | yes  | boxer | Análisis simple entre actividad y progreso. |

### GET /dashboards/boxer/summary

```json
{
  "current_weight": 74.5,
  "completed_workouts_this_month": 18,
  "attendance_percentage_this_month": 82,
  "active_program": {
    "id": "uuid",
    "name": "Preparacion amateur"
  }
}
```

---

# 26. Search and Filters

Endpoints de listado deberían soportar filtros básicos cuando aplique.

## Examples

```http
GET /boxers?search=martin&level=intermediate
GET /exercises?type=bag_work&status=completed&from=2026-05-01&to=2026-05-19
GET /attendance-records?boxer_id=uuid&from=2026-05-01&to=2026-05-19
GET /program-assignments?status=active
```

---

# 27. MVP Endpoint Summary

## Public

- `GET /health`
- `POST /auth/login`

## Authenticated

- `POST /auth/logout`
- `GET /auth/me`
- `POST /auth/change-password`

## Admin

- `GET /admin/users`
- `POST /admin/users`
- `GET /admin/users/{user_id}`
- `PATCH /admin/users/{user_id}`
- `POST /admin/users/{user_id}/activate`
- `POST /admin/users/{user_id}/deactivate`
- `GET /dashboards/admin/summary`

## Coach

- `GET /boxers`
- `POST /exercises`
- `POST /exercises/{exercise_id}/start`
- `POST /exercises/{exercise_id}/finish`
- `POST /exercises/{exercise_id}/cancel`
- `PUT /exercises/{exercise_id}/timer-config`
- `PUT /exercises/{exercise_id}/repetition-config`
- `GET /boxers/{boxer_id}/progress-entries`
- `GET /boxers/{boxer_id}/attendance-records`
- `GET /boxers/{boxer_id}/workout-completions`

## Boxer

- `GET /boxers/me`
- `PATCH /boxers/me`
- `POST /boxers/me/avatar`
- `GET /boxers/me/progress-entries`
- `POST /boxers/me/progress-entries`
- `GET /boxers/me/attendance-records`
- `GET /boxers/me/workout-completions`
- `GET /dashboards/boxer/summary`

---

# 28. Notes

- Este contrato es una primera versión del MVP.
- Puede transformarse luego en OpenAPI 3.
- Algunos endpoints podrían resolverse directamente con Supabase client + RLS.
- Si se usa `/api`, este contrato sirve como guía para endpoints custom.
- Las decisiones finales deben mantenerse alineadas con `docs/ENTITIES.md`, `docs/MVP_SPEC.md` y `docs/features/*.md`.
