# BoxPulse Docker Development Environment

Este documento define la estrategia local con Docker para BoxPulse.

## Objetivo

El ambiente de desarrollo debe poder levantar automáticamente al menos:

- web app
- API
- database

La app mobile no es obligatoria dentro de Docker en el MVP. Expo suele ejecutarse mejor desde el host para facilitar emuladores, dispositivos físicos, hot reload y tooling nativo.

## Servicios esperados

## 1. Database

Servicio: `db`

Tecnología:

- PostgreSQL

Responsabilidades:

- persistir datos locales
- exponer puerto local para herramientas como DataGrip o TablePlus
- usar volumen Docker para persistencia

Puerto sugerido:

```txt
5432:5432
```

Variables esperadas:

```env
POSTGRES_DB=boxpulse
POSTGRES_USER=boxpulse
POSTGRES_PASSWORD=boxpulse
```

## 2. API

Servicio: `api`

Ubicación esperada:

```txt
/api
```

Responsabilidades:

- exponer endpoints definidos en `docs/API_CONTRACT.md`
- validar payloads con Zod cuando corresponda
- conectarse a `db`
- aplicar reglas de dominio y autorización

Puerto sugerido:

```txt
3001:3001
```

Variables esperadas:

```env
DATABASE_URL=postgresql://boxpulse:boxpulse@db:5432/boxpulse
BOXPULSE_VERBOSE_LOGS=false
```

## 3. Web

Servicio: `web`

Ubicación esperada:

```txt
/apps/web
```

Responsabilidades:

- ejecutar la web app de administración
- consumir la API local

Puerto sugerido:

```txt
3000:3000
```

Variables esperadas:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api/v1
BOXPULSE_VERBOSE_LOGS=false
```

## Docker Compose

El repositorio debe incluir un `docker-compose.yml` en la raíz.

Comando esperado:

```bash
pnpm docker:up
```

Debe levantar:

```bash
docker compose up --build
```

Comando para apagar:

```bash
pnpm docker:down
```

Debe ejecutar:

```bash
docker compose down
```

## Healthchecks

El servicio `api` debe exponer:

```txt
GET /health
```

El servicio `web` debe poder depender de `api` cuando corresponda.

El servicio `api` debe depender de `db`.

## Mobile Development

La app mobile debe ejecutarse desde el host:

```bash
cd apps/mobile
pnpm start
```

Debe consumir la API local.

Cuando se use dispositivo físico, la URL de API no debe ser `localhost`, sino la IP local de la máquina de desarrollo.

Ejemplo:

```env
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.50:3001/api/v1
```

## Environment Files

No commitear `.env` reales.

Sí commitear:

```txt
.env.example
/api/.env.example
/apps/web/.env.example
/apps/mobile/.env.example
```

## Rules for Codex

Cuando una tarea toque setup, API, web o base de datos, Codex debe considerar Docker como requisito del ambiente local.

No se considera completa una configuración base si no puede levantarse con:

```bash
pnpm docker:up
```

Salvo que la tarea indique explícitamente lo contrario.

## Out of Scope for MVP

Queda fuera del MVP inicial:

- Dockerizar Expo mobile
- Kubernetes
- producción cloud
- CI/CD de despliegue
- Supabase local stack completo, salvo decisión posterior

## Notes

Aunque el producto pueda usar Supabase en etapas posteriores, el ambiente local API-first debe poder funcionar con PostgreSQL local para facilitar desarrollo, testing e independencia del entorno externo.
