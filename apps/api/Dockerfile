FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages ./packages
COPY apps/api ./apps/api

RUN npm install -g pnpm@11.2.2
RUN pnpm install --filter @skillbridge/api... --frozen-lockfile
RUN pnpm --filter @skillbridge/api build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/package.json

RUN npm install -g pnpm@11.2.2
RUN pnpm install --prod --filter @skillbridge/api... --frozen-lockfile

COPY --from=builder /app/apps/api/dist ./apps/api/dist

WORKDIR /app/apps/api
EXPOSE 3000
CMD ["node", "dist/index.js"]
