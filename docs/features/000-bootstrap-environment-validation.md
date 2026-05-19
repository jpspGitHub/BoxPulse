# Feature: Bootstrap Environment Validation

## Goal

Validar que el ambiente base de BoxPulse levanta correctamente antes de implementar features de negocio.

Esta feature existe para comprobar que el esqueleto técnico funciona de punta a punta.

## Users

- developers
- Codex

## Scope

- levantar database
- levantar API
- levantar web app
- levantar mobile app desde host
- validar healthcheck de API
- validar conexión web -> API
- validar conexión mobile -> API
- validar variables de entorno de ejemplo

## Out of Scope

- auth
- CRUDs
- entidades de negocio
- flujos de coach
- flujos de boxer
- Supabase real
- diseño final
- lógica de ejercicios

## Required Services

Docker debe levantar:

- `db`
- `api`
- `web`

Mobile debe correr desde host usando Expo.

## Expected Commands

### Docker services

```bash
pnpm docker:up
```

Debe levantar:

```txt
db
api
web
```

### API healthcheck

```bash
curl http://localhost:3001/health
```

Respuesta esperada:

```json
{
  "status": "ok"
}
```

### Web

```txt
http://localhost:3000
```

Debe mostrar una pantalla mínima indicando:

```txt
BoxPulse Web is running
API status: ok
```

### Mobile

```bash
cd apps/mobile
pnpm start
```

Debe abrir Expo y mostrar una pantalla mínima indicando:

```txt
BoxPulse Mobile is running
API status: ok
```

## Environment Variables

Deben existir archivos de ejemplo:

```txt
.env.example
/api/.env.example
/apps/web/.env.example
/apps/mobile/.env.example
```

Variables esperadas inicialmente:

```env
BOXPULSE_VERBOSE_LOGS=false
```

Para mobile en dispositivo físico:

```env
EXPO_PUBLIC_API_BASE_URL=http://<local-ip>:3001/api/v1
```

## Acceptance Criteria

- `pnpm docker:up` levanta `db`, `api` y `web`.
- `GET /health` responde correctamente.
- Web carga en `http://localhost:3000`.
- Web puede consultar healthcheck de API.
- Mobile inicia con Expo desde host.
- Mobile puede consultar healthcheck de API.
- Existen `.env.example` necesarios.
- No se implementa lógica de negocio.

## Suggested Issues

- [Task] Add root Docker Compose for db, api and web
- [Task] Add API healthcheck endpoint
- [Task] Add minimal web running screen
- [Task] Add minimal mobile running screen
- [Task] Add environment example files
- [Task] Add docker scripts to package.json
