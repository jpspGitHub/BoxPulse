# Feature: Auth and Roles

## Goal

Implementar autenticación y separación de experiencias por rol.

## Users

- admin
- coach
- boxer

## Scope

- login
- logout
- persistencia de sesión
- protección de rutas
- roles
- usuarios activos/inactivos

## Roles

- admin
- coach
- boxer

## Business Rules

- un usuario inactivo no puede ingresar
- cada usuario accede solo a funcionalidades permitidas
- mobile debe detectar correctamente el rol
- web admin debe proteger acceso por rol

## Technical Direction

- Supabase Auth
- JWT/session handling
- role validation
- route guards

## Acceptance Criteria

- login funciona en web y mobile
- sesión persiste correctamente
- usuarios sin permisos no pueden acceder
- el rol determina la experiencia visible

## Suggested Issues

- [Task] Configure Supabase auth
- [Task] Create auth session provider
- [Task] Implement role validation
- [Task] Protect admin routes
- [Task] Protect mobile coach and boxer routes

## Executable Tasks

### [Task] Configure Supabase auth foundation

#### Scope

- agregar variables de entorno de Supabase en `.env.example`, `api/.env.example`, `apps/web/.env.example` y `apps/mobile/.env.example`
- instalar y configurar dependencias mínimas de Supabase Auth donde corresponda
- crear clientes base de Supabase para web, mobile y API sin implementar UI de login
- documentar cómo se espera configurar URL y anon key en desarrollo

#### Acceptance Criteria

- web, mobile y API pueden inicializar un cliente Supabase con variables de entorno
- las variables nuevas están documentadas en archivos `.env.example`
- no se hardcodean secretos
- no se implementan pantallas ni guards todavía

### [Task] Create shared auth domain contracts

#### Scope

- definir tipos compartidos para sesión, usuario autenticado, rol y estado activo
- crear schemas Zod para payloads críticos de auth definidos en `docs/API_CONTRACT.md`
- exportar helpers mínimos desde `packages/shared`
- agregar tests livianos para schemas y helpers

#### Acceptance Criteria

- existen contratos compartidos para `AuthUser`, roles y sesión
- los schemas validan login y usuario actual según el contrato API
- web, mobile y API pueden importar los contratos desde `packages/shared`
- los tests del paquete shared cubren roles válidos y usuarios inactivos

### [Task] Create web auth session provider

#### Scope

- crear provider de sesión para Next.js
- leer sesión actual desde Supabase
- exponer usuario, rol, gimnasio y estado de carga
- agregar logout básico desde la capa de sesión

#### Acceptance Criteria

- web puede conocer sesión actual, rol y estado activo
- el provider maneja loading, authenticated y unauthenticated
- logout limpia la sesión local
- no se implementan pantallas admin finales ni guards de rutas en esta tarea

### [Task] Create mobile auth session provider

#### Scope

- crear provider de sesión para Expo
- leer y persistir sesión con Supabase Auth
- exponer usuario, rol, gimnasio y estado de carga
- agregar logout básico desde la capa de sesión

#### Acceptance Criteria

- mobile puede conocer sesión actual, rol y estado activo
- la sesión persiste entre reinicios de la app
- logout limpia la sesión local
- no se implementan pantallas coach/boxer finales ni guards de rutas en esta tarea

### [Task] Implement role and active-user guards

#### Scope

- implementar helpers compartidos para validar rol permitido
- implementar helpers para bloquear usuarios inactivos
- conectar validaciones mínimas en API o middleware disponible
- agregar tests livianos de autorización

#### Acceptance Criteria

- un usuario inactivo queda bloqueado por helpers de dominio
- roles no permitidos reciben una respuesta o estado de acceso denegado
- la lógica crítica está cubierta por tests
- no se implementa navegación específica de web o mobile en esta tarea

### [Task] Protect admin web routes

#### Scope

- proteger rutas web admin usando el provider y helpers de rol
- permitir acceso solo a usuarios `admin` activos
- mostrar mensaje amigable ante acceso no autorizado
- manejar estado de carga sin exponer contenido protegido

#### Acceptance Criteria

- usuarios no autenticados no acceden al área admin
- usuarios `coach` o `boxer` no acceden al área admin
- usuarios inactivos no acceden al área admin
- la UI muestra un estado claro para acceso denegado

### [Task] Protect mobile coach and boxer routes

#### Scope

- proteger rutas mobile según rol `coach` y `boxer`
- separar experiencia visible según rol
- bloquear usuarios inactivos
- manejar estado de carga sin mostrar contenido protegido

#### Acceptance Criteria

- mobile detecta correctamente el rol de la sesión
- coaches acceden solo a experiencia coach inicial
- boxers acceden solo a experiencia boxer inicial
- usuarios inactivos o sin permisos ven un mensaje amigable
