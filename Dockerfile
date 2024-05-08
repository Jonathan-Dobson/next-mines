FROM node:20-alpine as base
RUN apk add --no-cache libc6-compat
RUN npm install -g npm@10.6.0

FROM base as install

WORKDIR /app
COPY src/package.json .
COPY src/package-lock.json .
RUN npm ci

FROM install as build

COPY src/ .
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npx --max-old-space-size=4096 next build

FROM base as run

WORKDIR /app
ENV NODE_ENV=production

COPY --from=build app/.next/standalone .
COPY --from=build app/.next/static .next/static

EXPOSE 80

ENV PORT 80

CMD ["node", "server.js"]

