# BoxPulse Project Context

## 1. Descripción general

BoxPulse es una plataforma MVP para gimnasios de boxeo y deportes de combate.

El producto combina:

- una web app orientada a administración del gimnasio
- una mobile app para coaches y boxeadores
- una base técnica preparada para escalar desde un gimnasio inicial hacia múltiples gimnasios en el futuro

El objetivo principal es validar si una plataforma digital mejora:

- la organización de entrenamientos
- el flujo diario de los coaches
- el seguimiento del progreso de los boxeadores
- el registro de ejercicios y asistencia
- la operación básica del gimnasio
- el compromiso del boxeador con su evolución

BoxPulse no debe diseñarse como una app fitness genérica. Debe sentirse como una herramienta específica para gimnasios de boxeo, pensada para uso real dentro del gimnasio.

## 2. Reglas de comunicación y naming

- Las conversaciones, especificaciones y documentación funcional deben escribirse en español.
- El código fuente, nombres de tablas, variables, APIs, componentes y convenciones técnicas deben mantenerse en inglés.
- La documentación puede explicar conceptos en español y mantener identificadores técnicos en inglés.

Ejemplo esperado:

- Texto funcional: `El coach puede iniciar un ejercicio por cronómetro`.
- Naming técnico: `exercise_timer_configs`, `workout_completions`, `ProgressEntry`.

## 3. Visión de producto

La visión de BoxPulse es construir una plataforma de gestión y entrenamiento para gimnasios de boxeo.

El foco inicial está en:

- mobile-first para operación diaria
- control rápido de ejercicios por parte del coach
- seguimiento físico del boxeador
- historial de asistencia y ejercicios realizados
- administración básica de usuarios
- base preparada para futura gestión completa del gimnasio

A futuro, el producto puede evolucionar hacia:

- membresías
- pagos
- asistencia avanzada
- reportes administrativos
- gestión financiera
- notificaciones
- nutrición
- IA aplicada al progreso deportivo
- multi-gimnasio
- multi-sucursal

Estas capacidades futuras no pertenecen al MVP salvo que se indique explícitamente.

## 4. Plataformas

## 4.1 Web App

Uso principal:

- administración
- configuración
- gestión de usuarios
- dashboards

Usuarios principales:

- admin

Usuarios secundarios:

- coach, únicamente para tareas que se beneficien de pantalla grande

La web no es el centro operativo del coach. La operación diaria del coach debe priorizarse en mobile.

## 4.2 Mobile App

Uso principal:

- operación diaria dentro del gimnasio
- inicio y control de ejercicios
- selección de participantes
- registro de progreso
- visualización de historial
- seguimiento deportivo

Usuarios principales:

- coach
- boxer

La app mobile es el núcleo operativo del producto.

## 5. Roles

## 5.1 Admin

Responsable administrativo del gimnasio.

Puede:

- crear coaches
- crear boxers
- editar usuarios
- activar/desactivar usuarios
- asociar usuarios al gimnasio
- ver dashboard general
- ver actividad general
- gestionar información básica del gimnasio

No está pensado para ejecutar ejercicios ni registrar progreso físico como boxeador.

## 5.2 Coach

Responsable deportivo y operativo durante los entrenamientos.

Puede:

- ver boxeadores del gimnasio
- iniciar ejercicios desde mobile
- seleccionar participantes
- elegir tipo de entrenamiento
- configurar ejercicios por cronómetro
- configurar ejercicios por repeticiones
- controlar timer de rounds
- finalizar o cancelar ejercicios
- registrar observaciones
- ver asistencia
- ver ejercicios realizados
- ver progreso físico de boxeadores
- crear programas de entrenamiento
- crear sesiones y bloques
- configurar cronómetros
- asignar programas a boxeadores

La experiencia del coach debe ser mobile-first porque el coach trabaja caminando por el gimnasio, no sentado frente a una notebook.

## 5.3 Boxer

Usuario final de la app mobile.

Puede:

- ver entrenamientos o ejercicios realizados
- ver asistencia
- registrar peso y medidas
- actualizar datos personales
- actualizar imagen/avatar
- cambiar contraseña
- ver historial de progreso
- ver análisis entre ejercicios realizados y métricas físicas

El boxeador debe sentir que la app le muestra evolución y progreso, no solo datos sueltos.

## 6. Flujos principales del MVP

## 6.1 Flujo admin

1. El admin ingresa a la web.
2. Crea coaches.
3. Crea boxers.
4. Edita datos básicos de usuarios.
5. Activa/desactiva usuarios.
6. Revisa actividad general del gimnasio.

## 6.2 Flujo coach: iniciar ejercicio

1. El coach toca `Iniciar ejercicio` en la app mobile.
2. Selecciona los boxeadores participantes.
3. Selecciona el tipo de entrenamiento.
4. Selecciona modalidad: por cronómetro o por repeticiones.
5. Configura la modalidad seleccionada.
6. Ejecuta el ejercicio.
7. Finaliza o cancela el ejercicio.
8. El resultado queda registrado si fue finalizado correctamente.

Tipos de entrenamiento iniciales:

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

## 6.3 Flujo coach: ejercicio por cronómetro

El coach configura:

- largo del round
- descanso
- cantidad de rounds/repeticiones
- preparación inicial opcional

Durante la ejecución puede:

- pausar/continuar
- reiniciar round
- pasar al siguiente round
- reiniciar ejercicio completo
- finalizar manualmente
- cancelar ejercicio

Regla importante:

- finalizar guarda el resultado
- cancelar no debe registrarse como ejercicio completado

## 6.4 Flujo coach: ejercicio por repeticiones

El coach configura:

- cantidad de repeticiones
- series opcionales
- notas opcionales

Durante la ejecución la app muestra:

- detalle del ejercicio
- participantes
- timer ascendente para medir duración
- acciones de reiniciar, finalizar y cancelar

## 6.5 Flujo boxer: progreso y perfil

El boxer puede:

1. ingresar datos de peso y medidas
2. actualizar datos personales
3. actualizar teléfono e imagen/avatar
4. cambiar contraseña
5. ver asistencias
6. ver ejercicios realizados
7. ver progreso físico
8. ver análisis simple entre ejercicios y métricas

## 7. Funcionalidades principales del MVP

- autenticación con roles
- gestión de usuarios desde admin web
- coach mobile para iniciar ejercicios
- selección de boxeadores participantes
- ejercicios por cronómetro
- ejercicios por repeticiones
- finalización/cancelación de ejercicios
- registro de asistencia derivada de participación
- carga de progreso físico por boxer
- edición de perfil del boxer
- historial de ejercicios
- visualización de progreso
- dashboard básico admin
- dashboard básico coach

## 8. Stack técnico definido

## 8.1 Monorepo

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

## 8.2 Mobile

- React Native
- Expo
- TypeScript
- Expo Router
- NativeWind

## 8.3 Web

- Next.js
- TypeScript
- TailwindCSS
- shadcn/ui

## 8.4 Backend / BaaS

Dirección inicial:

- Supabase
- PostgreSQL
- Supabase Auth
- Row Level Security

El directorio `/api` queda disponible para servicios backend propios si el MVP necesita lógica fuera de Supabase.

## 8.5 Shared package

`packages/shared` debe usarse para:

- tipos compartidos
- constantes de dominio
- validaciones compartidas
- contratos base cuando corresponda

Debe evitarse convertirlo en un basurero de utilidades sin criterio. Poco, estable y útil.

## 9. Entidades principales

- users
- gyms
- gym_members
- coach_profiles
- boxer_profiles
- training_programs
- training_sessions
- training_blocks
- timer_configs
- program_assignments
- exercises
- exercise_timer_configs
- exercise_repetition_configs
- exercise_participants
- workout_completions
- progress_entries
- attendance_records

## 10. Principios de arquitectura

- construir slices pequeños y testeables
- evitar sobreingeniería temprana
- diseñar mobile-first para coach y boxer
- mantener web enfocada en administración
- documentar contratos antes de integrar clientes
- mantener lógica compartida pequeña y estable
- proteger datos por rol desde el inicio
- pensar en multi-gimnasio, pero no construir complejidad innecesaria en el MVP

## 11. Fuera del MVP

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

## 12. Estrategia de desarrollo

El desarrollo se hará de forma incremental usando ChatGPT, Codex y backlog técnico.

Flujo recomendado:

1. Mantener documentación actualizada en `/docs`.
2. Partir funcionalidades en tareas pequeñas.
3. Crear issues ejecutables para Codex.
4. Implementar por fases.
5. Validar con usuarios reales del gimnasio.
6. Ajustar el producto en base a feedback real.

Codex debe trabajar con tareas concretas, no con instrucciones gigantes del tipo `hacer toda la app`.

## 13. Criterio de éxito del MVP

El MVP será considerado exitoso si:

- al menos un gimnasio lo usa activamente
- al menos un coach inicia ejercicios desde mobile
- al menos cinco boxers participan en ejercicios registrados
- los boxers cargan progreso más de una vez
- el coach considera útil el seguimiento digital
- los boxers pueden ver claramente su evolución
- aparecen mejoras concretas para una segunda versión
