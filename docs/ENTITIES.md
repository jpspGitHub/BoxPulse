# BoxPulse Entities

Este documento define las entidades principales del MVP de BoxPulse y sus propiedades iniciales.

La documentación funcional está en español, pero los nombres técnicos de entidades y propiedades se mantienen en inglés para alinear base de datos, API, código y paquetes compartidos.

## Convenciones

- `id`: identificador único de la entidad.
- `created_at`: fecha de creación del registro.
- `updated_at`: fecha de última actualización del registro.
- Los nombres de entidades y propiedades están en inglés.
- Las descripciones están en español.
- El modelo está pensado inicialmente para Supabase/PostgreSQL.

---

# 1. users

Representa la cuenta base de autenticación del sistema.

> Nota: si se usa Supabase Auth, parte de esta información puede vivir en `auth.users`. Esta entidad representa la vista/perfil de dominio necesario para BoxPulse.

| Property | Type | Required | Description |
|---|---|---:|---|
| id | uuid | yes | Identificador único del usuario. |
| email | string | yes | Email usado para login. |
| is_active | boolean | yes | Indica si el usuario puede acceder al sistema. |
| created_at | timestamp | yes | Fecha de creación. |
| updated_at | timestamp | yes | Fecha de última actualización. |

---

# 2. gyms

Representa un gimnasio de boxeo o deportes de combate.

| Property | Type | Required | Description |
|---|---|---:|---|
| id | uuid | yes | Identificador único del gimnasio. |
| name | string | yes | Nombre del gimnasio. |
| slug | string | yes | Identificador legible para URLs o futura multitenancy. |
| created_at | timestamp | yes | Fecha de creación. |
| updated_at | timestamp | yes | Fecha de última actualización. |

---

# 3. gym_members

Representa la relación entre un usuario y un gimnasio, incluyendo su rol dentro de ese gimnasio.

| Property | Type | Required | Description |
|---|---|---:|---|
| id | uuid | yes | Identificador único de la membresía. |
| gym_id | uuid | yes | Referencia a `gyms.id`. |
| user_id | uuid | yes | Referencia a `users.id`. |
| role | enum | yes | Rol del usuario dentro del gimnasio. Valores: `admin`, `coach`, `boxer`. |
| created_at | timestamp | yes | Fecha de creación. |
| updated_at | timestamp | yes | Fecha de última actualización. |

## Business Rules

- Un usuario puede pertenecer a un gimnasio en el MVP.
- El modelo permite evolucionar a múltiples gimnasios por usuario en el futuro.
- El acceso funcional se define por `role`.

---

# 4. coach_profiles

Perfil deportivo/operativo de un coach.

| Property | Type | Required | Description |
|---|---|---:|---|
| id | uuid | yes | Identificador único del perfil de coach. |
| user_id | uuid | yes | Referencia a `users.id`. |
| gym_id | uuid | yes | Referencia a `gyms.id`. |
| first_name | string | yes | Nombre del coach. |
| last_name | string | yes | Apellido del coach. |
| phone | string | no | Teléfono de contacto. |
| avatar_url | string | no | URL de imagen/avatar. |
| notes | text | no | Notas internas sobre el coach. |
| created_at | timestamp | yes | Fecha de creación. |
| updated_at | timestamp | yes | Fecha de última actualización. |

---

# 5. boxer_profiles

Perfil deportivo de un boxeador.

| Property | Type | Required | Description |
|---|---|---:|---|
| id | uuid | yes | Identificador único del perfil de boxeador. |
| user_id | uuid | yes | Referencia a `users.id`. |
| gym_id | uuid | yes | Referencia a `gyms.id`. |
| first_name | string | yes | Nombre del boxeador. |
| last_name | string | yes | Apellido del boxeador. |
| phone | string | no | Teléfono de contacto. |
| avatar_url | string | no | URL de imagen/avatar. |
| birth_date | date | no | Fecha de nacimiento. |
| height | decimal | no | Altura del boxeador. |
| initial_weight | decimal | no | Peso inicial registrado. |
| level | enum | no | Nivel deportivo. Valores sugeridos: `beginner`, `intermediate`, `advanced`. |
| notes | text | no | Notas generales sobre el boxeador. |
| created_at | timestamp | yes | Fecha de creación. |
| updated_at | timestamp | yes | Fecha de última actualización. |

---

# 6. training_programs

Programa de entrenamiento creado por un coach.

| Property | Type | Required | Description |
|---|---|---:|---|
| id | uuid | yes | Identificador único del programa. |
| gym_id | uuid | yes | Referencia a `gyms.id`. |
| coach_id | uuid | yes | Referencia a `coach_profiles.id`. |
| name | string | yes | Nombre del programa. |
| description | text | no | Descripción del programa. |
| level | enum | yes | Nivel objetivo. Valores: `beginner`, `intermediate`, `advanced`. |
| status | enum | yes | Estado del programa. Valores: `draft`, `active`, `archived`. |
| created_at | timestamp | yes | Fecha de creación. |
| updated_at | timestamp | yes | Fecha de última actualización. |

## Business Rules

- Los programas archivados no se eliminan físicamente.
- Un programa pertenece a un gimnasio.
- Un programa es creado por un coach.

---

# 7. training_sessions

Sesión dentro de un programa de entrenamiento.

| Property | Type | Required | Description |
|---|---|---:|---|
| id | uuid | yes | Identificador único de la sesión. |
| program_id | uuid | yes | Referencia a `training_programs.id`. |
| name | string | yes | Nombre de la sesión. |
| description | text | no | Descripción de la sesión. |
| order_index | integer | yes | Orden de la sesión dentro del programa. |
| created_at | timestamp | yes | Fecha de creación. |
| updated_at | timestamp | yes | Fecha de última actualización. |

---

# 8. training_blocks

Bloque de trabajo dentro de una sesión de entrenamiento.

| Property | Type | Required | Description |
|---|---|---:|---|
| id | uuid | yes | Identificador único del bloque. |
| session_id | uuid | yes | Referencia a `training_sessions.id`. |
| type | enum | yes | Tipo de bloque. |
| name | string | yes | Nombre del bloque. |
| description | text | no | Descripción del bloque. |
| duration_seconds | integer | no | Duración estimada en segundos. |
| order_index | integer | yes | Orden del bloque dentro de la sesión. |
| coach_notes | text | no | Notas del coach. |
| created_at | timestamp | yes | Fecha de creación. |
| updated_at | timestamp | yes | Fecha de última actualización. |

## Suggested Block Types

- `warmup`
- `shadow_boxing`
- `jump_rope`
- `bag_work`
- `pads`
- `sparring`
- `strength`
- `conditioning`
- `core`
- `cooldown`
- `custom`

---

# 9. timer_configs

Configuración de cronómetro asociada a una sesión de entrenamiento planificada.

| Property | Type | Required | Description |
|---|---|---:|---|
| id | uuid | yes | Identificador único de la configuración. |
| session_id | uuid | yes | Referencia a `training_sessions.id`. |
| rounds | integer | yes | Cantidad de rounds. |
| round_duration_seconds | integer | yes | Duración de cada round en segundos. |
| rest_duration_seconds | integer | yes | Duración del descanso en segundos. |
| preparation_seconds | integer | no | Tiempo de preparación inicial. |
| created_at | timestamp | yes | Fecha de creación. |
| updated_at | timestamp | yes | Fecha de última actualización. |

---

# 10. program_assignments

Asignación de un programa de entrenamiento a un boxeador.

| Property | Type | Required | Description |
|---|---|---:|---|
| id | uuid | yes | Identificador único de la asignación. |
| program_id | uuid | yes | Referencia a `training_programs.id`. |
| boxer_id | uuid | yes | Referencia a `boxer_profiles.id`. |
| coach_id | uuid | yes | Referencia a `coach_profiles.id`. |
| start_date | date | yes | Fecha de inicio del programa asignado. |
| status | enum | yes | Estado. Valores: `active`, `completed`, `canceled`. |
| created_at | timestamp | yes | Fecha de creación. |
| updated_at | timestamp | yes | Fecha de última actualización. |

## Business Rules

- Las asignaciones quedan historizadas.
- Cancelar una asignación no elimina el historial.

---

# 11. exercises

Representa un ejercicio iniciado por un coach desde mobile.

| Property | Type | Required | Description |
|---|---|---:|---|
| id | uuid | yes | Identificador único del ejercicio. |
| gym_id | uuid | yes | Referencia a `gyms.id`. |
| coach_id | uuid | yes | Referencia a `coach_profiles.id`. |
| type | enum | yes | Tipo de ejercicio. |
| mode | enum | yes | Modalidad del ejercicio. Valores: `timer`, `repetitions`. |
| status | enum | yes | Estado. Valores: `pending`, `in_progress`, `completed`, `canceled`. |
| started_at | timestamp | no | Fecha/hora de inicio. |
| finished_at | timestamp | no | Fecha/hora de finalización. |
| canceled_at | timestamp | no | Fecha/hora de cancelación. |
| notes | text | no | Notas generales del ejercicio. |
| created_at | timestamp | yes | Fecha de creación. |
| updated_at | timestamp | yes | Fecha de última actualización. |

## Suggested Exercise Types

- `bag_work`
- `sparring`
- `abs`
- `jump_rope`
- `shadow_boxing`
- `pads`
- `defensive_technique`
- `conditioning`
- `strength`
- `custom`

## Business Rules

- Finalizar un ejercicio lo marca como `completed`.
- Cancelar un ejercicio lo marca como `canceled`.
- Un ejercicio cancelado no debe contar como completado.

---

# 12. exercise_timer_configs

Configuración de cronómetro para un ejercicio real iniciado por el coach.

| Property | Type | Required | Description |
|---|---|---:|---|
| id | uuid | yes | Identificador único de la configuración. |
| exercise_id | uuid | yes | Referencia a `exercises.id`. |
| rounds | integer | yes | Cantidad de rounds. |
| round_duration_seconds | integer | yes | Duración del round. |
| rest_duration_seconds | integer | yes | Duración del descanso. |
| preparation_seconds | integer | no | Tiempo de preparación inicial. |
| created_at | timestamp | yes | Fecha de creación. |
| updated_at | timestamp | yes | Fecha de última actualización. |

---

# 13. exercise_repetition_configs

Configuración de repeticiones para un ejercicio real iniciado por el coach.

| Property | Type | Required | Description |
|---|---|---:|---|
| id | uuid | yes | Identificador único de la configuración. |
| exercise_id | uuid | yes | Referencia a `exercises.id`. |
| repetitions | integer | yes | Cantidad de repeticiones. |
| sets | integer | no | Cantidad de series. |
| created_at | timestamp | yes | Fecha de creación. |
| updated_at | timestamp | yes | Fecha de última actualización. |

---

# 14. exercise_participants

Relación entre un ejercicio y los boxeadores participantes.

| Property | Type | Required | Description |
|---|---|---:|---|
| id | uuid | yes | Identificador único del participante en el ejercicio. |
| exercise_id | uuid | yes | Referencia a `exercises.id`. |
| boxer_id | uuid | yes | Referencia a `boxer_profiles.id`. |
| status | enum | yes | Estado del participante. Valores sugeridos: `selected`, `present`, `completed`, `removed`. |
| created_at | timestamp | yes | Fecha de creación. |
| updated_at | timestamp | yes | Fecha de última actualización. |

## Business Rules

- Un ejercicio debe tener al menos un participante para iniciarse.
- La participación puede usarse como fuente para asistencia.

---

# 15. workout_completions

Registro de entrenamiento o sesión completada por un boxeador.

| Property | Type | Required | Description |
|---|---|---:|---|
| id | uuid | yes | Identificador único del registro. |
| assignment_id | uuid | no | Referencia a `program_assignments.id`, si aplica. |
| session_id | uuid | no | Referencia a `training_sessions.id`, si aplica. |
| boxer_id | uuid | yes | Referencia a `boxer_profiles.id`. |
| exercise_id | uuid | no | Referencia a `exercises.id`, si la finalización proviene de un ejercicio real. |
| completed_at | timestamp | yes | Fecha/hora de finalización. |
| notes | text | no | Notas del entrenamiento completado. |
| created_at | timestamp | yes | Fecha de creación. |

## Business Rules

- Los entrenamientos completados no se eliminan físicamente.
- Puede originarse desde un programa asignado o desde un ejercicio iniciado por coach.

---

# 16. progress_entries

Registro de progreso físico cargado por el boxeador.

| Property | Type | Required | Description |
|---|---|---:|---|
| id | uuid | yes | Identificador único del registro. |
| boxer_id | uuid | yes | Referencia a `boxer_profiles.id`. |
| weight | decimal | no | Peso. |
| height | decimal | no | Altura. |
| waist | decimal | no | Cintura. |
| chest | decimal | no | Pecho. |
| arm | decimal | no | Brazo. |
| leg | decimal | no | Pierna. |
| body_fat_percentage | decimal | no | Porcentaje de grasa corporal. |
| notes | text | no | Observaciones. |
| entry_date | date | yes | Fecha del registro de progreso. |
| created_at | timestamp | yes | Fecha de creación. |

## Business Rules

- Los registros de progreso quedan historizados.
- El boxeador solo puede cargar y ver sus propios registros.
- El coach puede ver registros de sus boxeadores dentro del gimnasio.

---

# 17. attendance_records

Registro de asistencia de un boxeador al gimnasio.

| Property | Type | Required | Description |
|---|---|---:|---|
| id | uuid | yes | Identificador único del registro. |
| gym_id | uuid | yes | Referencia a `gyms.id`. |
| boxer_id | uuid | yes | Referencia a `boxer_profiles.id`. |
| coach_id | uuid | no | Referencia a `coach_profiles.id`, si aplica. |
| source | enum | yes | Fuente de la asistencia. Valores: `manual`, `exercise_participation`. |
| attended_at | timestamp | yes | Fecha/hora de asistencia. |
| created_at | timestamp | yes | Fecha de creación. |

## Business Rules

- La asistencia puede generarse manualmente o derivarse de participación en ejercicios.
- En el MVP, la participación en un ejercicio puede contar como asistencia.

---

# 18. Suggested Enums

## user_role

- `admin`
- `coach`
- `boxer`

## boxer_level

- `beginner`
- `intermediate`
- `advanced`

## training_program_status

- `draft`
- `active`
- `archived`

## training_program_level

- `beginner`
- `intermediate`
- `advanced`

## program_assignment_status

- `active`
- `completed`
- `canceled`

## exercise_type

- `bag_work`
- `sparring`
- `abs`
- `jump_rope`
- `shadow_boxing`
- `pads`
- `defensive_technique`
- `conditioning`
- `strength`
- `custom`

## exercise_mode

- `timer`
- `repetitions`

## exercise_status

- `pending`
- `in_progress`
- `completed`
- `canceled`

## exercise_participant_status

- `selected`
- `present`
- `completed`
- `removed`

## attendance_source

- `manual`
- `exercise_participation`

---

# 19. Future Entities Outside MVP

Estas entidades pueden aparecer en versiones futuras, pero quedan fuera del MVP inicial:

- memberships
- payments
- invoices
- subscriptions
- plans
- notifications
- chat_messages
- nutrition_plans
- media_assets
- gym_branches
- check_ins
- wearable_integrations

---

# 20. Next Steps

Este documento puede usarse como base para:

- crear migraciones SQL
- generar tipos TypeScript en `packages/shared`
- definir validaciones con Zod
- actualizar `API_CONTRACT.md`
- crear issues técnicas para Codex
