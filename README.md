# BoxPulse

MVP platform for boxing and combat sports gyms.

## Bootstrap Commands

```bash
pnpm install
pnpm lint
pnpm format
pnpm typecheck
pnpm test
pnpm build
```

## Workspace Structure

```txt
/api              Express API and backend entrypoints
/apps/web         Next.js web app
/apps/mobile      Expo mobile app
/packages/shared  Shared TypeScript package
/docs             Functional and technical documentation
/agent            Codex task prompts
```

Use `pnpm` from the repository root. Package-specific commands should use workspace filters,
for example `pnpm --filter @boxpulse/api dev`.

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
