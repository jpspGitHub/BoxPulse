FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml tsconfig.base.json ./
COPY api/package.json ./api/package.json

RUN pnpm install --filter @boxpulse/api... --frozen-lockfile=false

COPY api ./api

WORKDIR /app/api

EXPOSE 3001

CMD ["pnpm", "dev"]
