# Feature: Admin User Management

## Goal

Permitir que el administrador gestione coaches y boxers del gimnasio.

## Users

- admin

## Scope

- crear usuarios
- editar usuarios
- activar/desactivar usuarios
- listar usuarios
- asociar usuarios al gimnasio

## User Types

- coach
- boxer

## Business Rules

- solo admins pueden acceder
- usuarios inactivos no pueden ingresar
- email debe ser único
- un usuario pertenece al gimnasio actual

## Acceptance Criteria

- el admin puede crear coaches y boxers
- el admin puede activar/desactivar usuarios
- la lista muestra información básica
- el estado del usuario es visible

## Suggested Issues

- [Task] Create admin users list
- [Task] Create user creation form
- [Task] Add user activation toggle
- [Task] Persist gym membership

## Executable Tasks

### [Task] Create shared admin user contracts

#### Scope

- definir tipos compartidos para usuarios administrados desde web admin
- crear schemas Zod para payloads de `GET /admin/users`, `POST /admin/users` y `PATCH /admin/users/{user_id}`
- representar roles permitidos para creación admin: `coach` y `boxer`
- agregar tests livianos para schemas críticos

#### Acceptance Criteria

- existen contratos compartidos para listado, creación y edición de usuarios admin
- los schemas validan email, rol, nombre, apellido, teléfono y nivel cuando corresponda
- los roles permitidos excluyen `admin` para creación desde esta pantalla
- web, API y shared pueden importar los contratos desde `packages/shared`

### [Task] Implement admin users read API

#### Scope

- implementar `GET /admin/users`
- implementar `GET /admin/users/{user_id}`
- limitar resultados al gimnasio actual del admin autenticado
- devolver información básica de usuario, rol, perfil y estado activo
- aplicar autorización para rol `admin`

#### Acceptance Criteria

- un admin puede listar coaches y boxers de su gimnasio
- un admin puede obtener el detalle de un usuario de su gimnasio
- usuarios no admin no pueden acceder a estos endpoints
- la respuesta respeta `docs/API_CONTRACT.md`

### [Task] Implement admin user creation and gym membership

#### Scope

- implementar `POST /admin/users`
- crear usuario base y perfil correspondiente para `coach` o `boxer`
- asociar el usuario al gimnasio actual mediante `gym_members`
- validar email único y rol permitido
- aplicar autorización para rol `admin`

#### Acceptance Criteria

- un admin puede crear coaches y boxers para su gimnasio
- cada usuario creado queda asociado al gimnasio actual
- emails duplicados devuelven error amigable y consistente con el contrato
- no se puede crear un usuario con rol `admin` desde este endpoint

### [Task] Implement admin user update and activation API

#### Scope

- implementar `PATCH /admin/users/{user_id}`
- implementar `POST /admin/users/{user_id}/activate`
- implementar `POST /admin/users/{user_id}/deactivate`
- permitir edición de datos básicos de perfil
- bloquear cambios sobre usuarios fuera del gimnasio actual

#### Acceptance Criteria

- un admin puede editar datos básicos de coaches y boxers de su gimnasio
- un admin puede activar y desactivar usuarios de su gimnasio
- usuarios inactivos no pueden ingresar según las reglas de auth existentes
- usuarios fuera del gimnasio actual no pueden modificarse

### [Task] Create admin users list UI

#### Scope

- crear pantalla web admin de listado de usuarios
- consumir `GET /admin/users`
- mostrar nombre, email, rol y estado activo
- incluir estados de carga, vacío y error amigable
- mantener protección de ruta admin existente

#### Acceptance Criteria

- el admin puede ver coaches y boxers del gimnasio en una lista clara
- el estado activo/inactivo es visible
- la pantalla maneja carga, vacío y errores sin exponer detalles técnicos
- no se implementa creación, edición ni activación en esta tarea

### [Task] Create admin user form UI

#### Scope

- crear formulario web admin para alta y edición básica de usuarios
- consumir `POST /admin/users` para altas
- consumir `PATCH /admin/users/{user_id}` para edición
- validar el formulario con los schemas compartidos
- mostrar errores amigables al usuario

#### Acceptance Criteria

- el admin puede crear coaches y boxers desde web
- el admin puede editar datos básicos definidos por contrato
- el formulario valida campos requeridos antes de enviar
- errores de API se muestran con mensajes amigables

### [Task] Add admin user activation controls

#### Scope

- agregar controles web para activar y desactivar usuarios
- consumir `POST /admin/users/{user_id}/activate`
- consumir `POST /admin/users/{user_id}/deactivate`
- reflejar el estado actualizado en la lista o detalle
- pedir confirmación antes de desactivar un usuario

#### Acceptance Criteria

- el admin puede activar usuarios inactivos
- el admin puede desactivar usuarios activos con confirmación
- la UI actualiza el estado visible después de la acción
- errores de activación/desactivación muestran mensajes amigables
