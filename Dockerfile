FROM node:18-alpine as builder

WORKDIR /app

COPY . .

RUN npm i -g pnpm
RUN pnpm i

FROM node:18-alpine as runner


WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV production

RUN npm i -g pnpm


EXPOSE ${PORT}

ENTRYPOINT ["pnpm", "start"]
