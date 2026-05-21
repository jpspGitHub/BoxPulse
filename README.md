# BoxPulse

MVP platform for boxing and combat sports gyms.

## Bootstrap Commands

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Local Services

API:

```bash
pnpm --filter @boxpulse/api dev
```

Healthcheck:

```bash
curl http://localhost:3001/health
```

Web:

```bash
pnpm --filter @boxpulse/web dev
```

Mobile:

```bash
cd apps/mobile
pnpm start
```

Docker:

```bash
pnpm docker:up
pnpm docker:down
```
