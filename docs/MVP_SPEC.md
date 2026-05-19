# BoxPulse MVP Spec

## 1. Visión

BoxPulse es una plataforma MVP para gimnasios de boxeo y deportes de combate.

El objetivo es validar si una herramienta digital mejora la organización de entrenamientos, el seguimiento de boxeadores, el flujo diario de entrenadores y la operación básica del gimnasio.

El producto no busca ser una app fitness genérica. La visión es construir una plataforma específica para gimnasios de boxeo, con foco en uso real dentro del gimnasio.

## 2. Objetivo del MVP

Validar en un gimnasio real si BoxPulse aporta valor en estos puntos:

- organización de ejercicios y entrenamientos
- seguimiento del progreso físico de los boxeadores
- control operativo desde el celular del entrenador
- registro de asistencia y actividad
- visualización del progreso por parte del boxeador
- base preparada para futura administración de gimnasio

El MVP debe ser pequeño, pero suficientemente completo para probarse con entrenadores y boxeadores reales.

## 3. Plataformas

### 3.1 Web App

Uso principal:

- administración
- configuración
- gestión de usuarios
- dashboards

Usuarios principales:

- admin

Usuarios secundarios:

- coach, solo si necesita operar desde pantalla grande

### 3.2 Mobile App

Uso principal:

- operación diaria dentro del gimnasio
- seguimiento deportivo
- ejecución de ejercicios
- registro de progreso

Usuarios principales:

- coach
- boxer

La app mobile es el núcleo operativo del producto.

## 4. Roles

### 4.1 Admin

Responsable administrativo del gimnasio.

Puede:

- crear entrenadores
- crear boxeadores
- editar usuarios
- activar/desactivar usuarios
- asociar usuarios al gimnasio
- ver dashboard general
- ver actividad general del gimnasio

No puede:

- registrar progreso físico como boxeador
- ejecutar ejercicios como boxeador

### 4.2 Coach

Responsable del entrenamiento y seguimiento deportivo.

Puede:

- ver boxeadores asignados o activos del gimnasio
- iniciar ejercicios desde mobile
- seleccionar boxeadores participantes
- elegir tipo de ejercicio
- ejecutar ejercicios por cronómetro
- ejecutar ejercicios por repeticiones
- registrar observaciones
- ver asistencia
- ver ejercicios realizados
- ver progreso físico de boxeadores
- crear programas de entrenamiento
- crear sesiones y bloques
- configurar cronómetros
- asignar programas a boxeadores

La experiencia del coach debe ser mobile-first porque el entrenador trabaja caminando por el gimnasio.

### 4.3 Boxer

Usuario final de la app mobile.

Puede:

- ver entrenamientos o ejercicios realizados
- ver asistencia
- registrar peso y medidas
- actualizar datos personales
- cambiar contraseña
- ver historial de progreso
- ver análisis entre ejercicios realizados y métricas físicas

## 5. Funcionalidades incluidas en el MVP

## 5.1 Autenticación y autorización

### Requisitos

- login
- logout
- persistencia de sesión
- roles: `admin`, `coach`, `boxer`
- protección de rutas web y mobile
- usuarios activos/inactivos

### Criterios de aceptación

- cada usuario accede solo a funcionalidades permitidas por su rol
- un usuario inactivo no puede ingresar
- la sesión se mantiene correctamente
- el sistema distingue experiencia admin, coach y boxer

## 5.2 Gestión de usuarios

### Requisitos

El admin puede:

- crear coaches
- crear boxers
- editar datos básicos
- activar usuarios
- desactivar usuarios
- asociar usuarios al gimnasio

### Datos básicos

- nombre
- apellido
- email
- teléfono opcional
- rol
- estado activo/inactivo

### Criterios de aceptación

- el admin puede listar usuarios
- el admin puede crear coaches y boxers
- el admin puede activar/desactivar usuarios
- el admin puede editar información básica

## 5.3 Coach mobile: iniciar ejercicio

Este es uno de los flujos centrales del MVP.

### Flujo

1. El coach toca `Iniciar ejercicio`.
2. Selecciona los boxeadores participantes.
3. Selecciona el tipo de entrenamiento.
4. Selecciona modalidad: por cronómetro o por repeticiones.
5. Configura la modalidad seleccionada.
6. Ejecuta el ejercicio.
7. Finaliza o cancela el ejercicio.
8. El resultado queda registrado.

### Tipos de entrenamiento iniciales

- bolsa
- sparring
- abdominales
- comba
- sombra
- manoplas
- técnica defensiva
- resistencia
- fuerza
- personalizado

## 5.4 Coach mobile: selección de boxeadores

### Requisitos

El coach puede:

- ver lista de boxeadores
- buscar boxeadores
- seleccionar múltiples participantes
- ver cantidad seleccionada
- continuar al tipo de entrenamiento

### Criterios de aceptación

- el coach puede seleccionar uno o más boxeadores
- el sistema muestra claramente quiénes participarán
- no se puede iniciar un ejercicio sin participantes

## 5.5 Coach mobile: ejercicio por cronómetro

### Configuración

El coach puede configurar:

- largo del round
- descanso
- cantidad de rounds/repeticiones
- tiempo de preparación inicial opcional

### Ejecución

La pantalla de ejecución debe mostrar:

- timer grande
- estado actual: preparación, round, descanso, finalizado
- round actual
- cantidad total de rounds
- participantes

### Acciones disponibles

- pausar/continuar
- reiniciar round
- pasar al siguiente round
- reiniciar ejercicio completo
- finalizar manualmente
- cancelar ejercicio

### Comportamiento

- si existe preparación inicial, se ejecuta antes del primer round
- al terminar un round, pasa automáticamente al descanso
- al terminar el descanso, pasa automáticamente al siguiente round
- el ciclo se repite hasta completar todos los rounds
- al finalizar, se muestra resumen del ejercicio

### Criterios de aceptación

- el timer funciona correctamente
- el estado visual cambia entre round y descanso
- el coach puede finalizar manualmente
- el coach puede cancelar sin guardar como completado
- finalizar y cancelar son acciones diferentes

## 5.6 Coach mobile: ejercicio por repeticiones

### Configuración

El coach puede configurar:

- cantidad de repeticiones
- series opcionales
- notas opcionales

### Ejecución

La pantalla debe mostrar:

- ejercicio seleccionado
- repeticiones configuradas
- participantes
- timer ascendente para medir duración
- estado en curso

### Acciones disponibles

- reiniciar timer
- finalizar ejercicio
- cancelar ejercicio

### Criterios de aceptación

- al iniciar, comienza un timer ascendente
- el coach puede reiniciar el contador de tiempo
- el coach puede finalizar y guardar el resultado
- el coach puede cancelar sin guardar como completado

## 5.7 Programas de entrenamiento

### Requisitos

El coach puede crear programas de entrenamiento.

Un programa puede contener:

- sesiones
- bloques
- configuración de cronómetro

### Datos del programa

- nombre
- descripción
- nivel: beginner, intermediate, advanced
- estado: draft, active, archived

### Criterios de aceptación

- el coach puede crear programas
- el coach puede editar programas
- el coach puede archivar programas
- los programas pueden asignarse a boxeadores

## 5.8 Sesiones y bloques de entrenamiento

### Sesiones

Cada programa puede tener múltiples sesiones.

Datos:

- nombre
- descripción
- orden

### Bloques

Cada sesión puede tener múltiples bloques.

Tipos iniciales:

- warmup
- shadow_boxing
- jump_rope
- bag_work
- pads
- sparring
- strength
- conditioning
- core
- cooldown
- custom

Datos:

- tipo
- nombre
- descripción
- duración
- orden
- notas del coach

### Criterios de aceptación

- el coach puede crear sesiones
- el coach puede crear bloques
- las sesiones y bloques se muestran ordenados

## 5.9 Asignación de programas

### Requisitos

El coach puede asignar programas a boxeadores.

### Datos

- programa
- boxeador
- coach
- fecha de inicio
- estado: active, completed, canceled

### Criterios de aceptación

- el boxeador ve su programa activo
- el coach ve asignaciones activas
- el historial queda registrado

## 5.10 Boxer mobile: progreso físico

### Requisitos

El boxer puede registrar:

- peso
- altura
- cintura
- pecho
- brazo
- pierna
- porcentaje de grasa opcional
- observaciones
- fecha

### Criterios de aceptación

- el boxer puede cargar un registro de progreso
- el boxer puede ver su historial
- el coach puede ver el progreso de sus boxeadores
- los registros quedan historizados

## 5.11 Boxer mobile: perfil personal

### Requisitos

El boxer puede:

- actualizar nombre
- actualizar apellido
- actualizar teléfono
- actualizar imagen/avatar
- cambiar contraseña

### Criterios de aceptación

- los datos personales se actualizan correctamente
- la imagen/avatar puede cambiarse
- el cambio de contraseña valida datos correctamente

## 5.12 Boxer mobile: asistencia, ejercicios y progreso

### Requisitos

El boxer puede ver:

- asistencias
- ejercicios realizados
- historial de entrenamientos
- progreso físico
- análisis entre actividad y métricas

### Datos visibles

- porcentaje de asistencia
- días entrenados
- faltas
- ejercicios completados
- rounds realizados
- repeticiones realizadas
- horas entrenadas
- evolución de peso y medidas

### Criterios de aceptación

- el boxer puede ver asistencia semanal/mensual
- el boxer puede ver ejercicios realizados
- el boxer puede ver evolución física
- la app muestra una relación visual simple entre entrenamiento y progreso

## 5.13 Dashboard admin

### Requisitos

El admin puede visualizar:

- cantidad de usuarios
- cantidad de coaches
- cantidad de boxers
- programas activos
- actividad reciente

### Criterios de aceptación

- el dashboard muestra datos reales
- el admin puede navegar hacia la gestión de usuarios

## 5.14 Dashboard coach

### Requisitos

El coach puede visualizar:

- boxeadores activos
- ejercicios recientes
- sesiones completadas
- últimos registros de progreso
- asistencia reciente

### Criterios de aceptación

- el coach puede detectar actividad reciente
- el coach puede entrar al detalle de un boxeador

## 6. Funcionalidades fuera del MVP

Quedan fuera explícitamente:

- pagos
- membresías
- facturación
- caja
- control financiero
- QR check-in
- chat interno
- notificaciones push
- videos de ejercicios
- inteligencia artificial
- nutrición
- wearables
- Apple Health
- Google Fit
- marketplace de entrenadores
- multi-gimnasio avanzado

## 7. Modelo de datos inicial

### users

- id
- email
- is_active
- created_at
- updated_at

### gyms

- id
- name
- slug
- created_at
- updated_at

### gym_members

- id
- gym_id
- user_id
- role
- created_at
- updated_at

Roles:

- admin
- coach
- boxer

### coach_profiles

- id
- user_id
- gym_id
- first_name
- last_name
- phone
- avatar_url
- notes
- created_at
- updated_at

### boxer_profiles

- id
- user_id
- gym_id
- first_name
- last_name
- phone
- avatar_url
- birth_date
- height
- initial_weight
- level
- notes
- created_at
- updated_at

### training_programs

- id
- gym_id
- coach_id
- name
- description
- level
- status
- created_at
- updated_at

### training_sessions

- id
- program_id
- name
- description
- order_index
- created_at
- updated_at

### training_blocks

- id
- session_id
- type
- name
- description
- duration_seconds
- order_index
- coach_notes
- created_at
- updated_at

### timer_configs

- id
- session_id
- rounds
- round_duration_seconds
- rest_duration_seconds
- preparation_seconds
- created_at
- updated_at

### program_assignments

- id
- program_id
- boxer_id
- coach_id
- start_date
- status
- created_at
- updated_at

### exercises

- id
- gym_id
- coach_id
- type
- mode
- status
- started_at
- finished_at
- canceled_at
- notes
- created_at
- updated_at

Modes:

- timer
- repetitions

Statuses:

- pending
- in_progress
- completed
- canceled

### exercise_timer_configs

- id
- exercise_id
- rounds
- round_duration_seconds
- rest_duration_seconds
- preparation_seconds
- created_at
- updated_at

### exercise_repetition_configs

- id
- exercise_id
- repetitions
- sets
- created_at
- updated_at

### exercise_participants

- id
- exercise_id
- boxer_id
- status
- created_at
- updated_at

### workout_completions

- id
- assignment_id
- session_id
- boxer_id
- exercise_id
- completed_at
- notes
- created_at

### progress_entries

- id
- boxer_id
- weight
- height
- waist
- chest
- arm
- leg
- body_fat_percentage
- notes
- entry_date
- created_at

### attendance_records

- id
- gym_id
- boxer_id
- coach_id
- source
- attended_at
- created_at

Sources:

- manual
- exercise_participation

## 8. Stack tecnológico

### Mobile

- React Native
- Expo
- TypeScript
- Expo Router
- NativeWind

### Web

- Next.js
- TypeScript
- TailwindCSS
- shadcn/ui

### Backend / BaaS

- Supabase
- PostgreSQL
- Supabase Auth
- Row Level Security

### Monorepo

Estructura esperada:

```txt
/api
/apps
  /mobile
  /web
/packages
  /shared
/docs
```

## 9. Reglas de negocio

- un usuario puede pertenecer a un gimnasio
- un gimnasio tiene admins, coaches y boxers
- un admin gestiona usuarios del gimnasio
- un coach opera ejercicios y entrenamientos del gimnasio
- un boxer solo accede a sus propios datos
- un coach puede ver datos de boxers asociados al gimnasio
- finalizar ejercicio guarda resultado
- cancelar ejercicio no debe guardarse como completado
- los ejercicios completados no se eliminan físicamente
- los registros de progreso quedan historizados
- los programas archivados no se eliminan físicamente

## 10. Flujos principales

### 10.1 Flujo admin

1. Inicia sesión en web.
2. Crea coaches.
3. Crea boxers.
4. Activa/desactiva usuarios.
5. Revisa actividad general.

### 10.2 Flujo coach: ejercicio por cronómetro

1. Inicia sesión en mobile.
2. Toca `Iniciar ejercicio`.
3. Selecciona boxeadores participantes.
4. Selecciona entrenamiento, por ejemplo bolsa o sparring.
5. Selecciona modalidad por cronómetro.
6. Configura round, descanso y cantidad de rounds.
7. Inicia cronómetro.
8. Controla round, descanso, pausa, reinicio o finalización.
9. Finaliza y guarda resultado.

### 10.3 Flujo coach: ejercicio por repeticiones

1. Inicia sesión en mobile.
2. Toca `Iniciar ejercicio`.
3. Selecciona boxeadores participantes.
4. Selecciona entrenamiento, por ejemplo abdominales.
5. Selecciona modalidad por repeticiones.
6. Configura repeticiones y series.
7. Inicia ejercicio.
8. El timer ascendente mide duración.
9. Finaliza y guarda resultado.

### 10.4 Flujo boxer: progreso y perfil

1. Inicia sesión en mobile.
2. Visualiza resumen personal.
3. Registra peso y medidas.
4. Actualiza datos personales si corresponde.
5. Cambia contraseña si corresponde.
6. Consulta asistencia.
7. Consulta ejercicios realizados.
8. Consulta análisis de progreso.

## 11. Métricas de validación

Durante la prueba en el gimnasio medir:

- coaches activos
- boxers activos
- ejercicios iniciados
- ejercicios completados
- ejercicios cancelados
- boxers participantes por ejercicio
- registros de progreso cargados
- asistencias registradas
- frecuencia semanal de uso
- feedback de coaches
- feedback de boxers

## 12. Criterio de éxito del MVP

El MVP se considera validado si:

- al menos un gimnasio lo usa activamente
- al menos un coach inicia ejercicios desde mobile
- al menos cinco boxers participan en ejercicios registrados
- los boxers cargan progreso más de una vez
- el coach considera útil el flujo de seguimiento
- los boxers pueden ver claramente su evolución
- se identifican mejoras concretas para una segunda versión
