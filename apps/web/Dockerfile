FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/web/package.json ./apps/web/package.json
COPY packages/shared/package.json ./packages/shared/package.json

RUN pnpm install --filter @boxpulse/web... --frozen-lockfile=false

COPY apps/web ./apps/web
COPY packages/shared ./packages/shared

RUN pnpm --filter @boxpulse/shared build

WORKDIR /app/apps/web

EXPOSE 3000

CMD ["pnpm", "dev"]
