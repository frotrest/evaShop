FROM node:20-alpine AS base

WORKDIR /app

COPY package*json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=base /app/dist ./dist

USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD wget -q0- http:127.0.0.1:3000 | exit 1

CMD ["serve", "-s", "dist", "-l", "3000"]