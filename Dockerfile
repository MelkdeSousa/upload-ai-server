

FROM node:18-alpine as builder

WORKDIR /app

COPY . .

RUN npm i -g pnpm
RUN pnpm i

FROM node:18-alpine as runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production
ENV PORT=3333

EXPOSE 3333

RUN npm i -g pnpm

COPY . .

CMD ["pnpm", "start"]
