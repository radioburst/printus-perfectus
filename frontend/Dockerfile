# ========================================================================
# Install dependencies only when needed
FROM node:18-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ========================================================================
FROM node:18-slim AS development
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

WORKDIR /app/frontend
CMD ["npm", "run", "start:dev"]

# ========================================================================
FROM node:18-slim AS production
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 runner

COPY --from=deps --chown=runner:nodejs /app/node_modules ./node_modules
COPY --chown=runner:nodejs . . 

CMD ["npm", "run", "start:prod"]
