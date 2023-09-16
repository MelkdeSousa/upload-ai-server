FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm i -g pnpm
RUN pnpm i -P

EXPOSE 3333

CMD ["pnpm", "start"]
