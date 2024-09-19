# ==============================================
# Builder
# ==============================================
FROM node:20.17.0-slim as builder

RUN apt update && apt install -y curl \
    && apt upgrade -y \
    && npm install -g npm

WORKDIR /app

RUN chown node:node /app
USER 1000

COPY --chown=node:node package*.json ./
RUN npm ci

COPY --chown=node:node . .
RUN npm run build

# ==============================================
# Runner
# ==============================================
FROM node:20.17.0-slim as runner

RUN apt update && apt install -y openssl \
    && apt upgrade -y \
    && npm install -g npm

WORKDIR /app

RUN chown node:node /app
USER 1000

COPY --chown=node:node --from=builder /app/package*.json ./
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/.next ./.next
COPY --chown=node:node --from=builder /app/next.config.mjs ./next.config.mjs

ARG APP_ENV=production
ENV APP_ENV=${APP_ENV}

ARG PORT=3000
ENV PORT=${PORT}
EXPOSE ${PORT}

CMD ["npm", "start"]
