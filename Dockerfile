# ============================================================
# Multi-stage Dockerfile for Classat Website (Next.js 15)
# ============================================================

# ---- Stage 1: Install dependencies ----
FROM node:20-alpine AS deps

RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# ---- Stage 2: Build the application ----
FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time env vars (passed via --build-arg or CI/CD)
ARG NEXT_PUBLIC_HOST_API
ARG NEXT_PUBLIC_HOST_API_SHARED
ARG NEXT_PUBLIC_GOOGLE_MAP_API_KEY
ARG NEXT_PUBLIC_GOOGLE_MAP_ID

ENV NEXT_PUBLIC_HOST_API=$NEXT_PUBLIC_HOST_API
ENV NEXT_PUBLIC_HOST_API_SHARED=$NEXT_PUBLIC_HOST_API_SHARED
ENV NEXT_PUBLIC_GOOGLE_MAP_API_KEY=$NEXT_PUBLIC_GOOGLE_MAP_API_KEY
ENV NEXT_PUBLIC_GOOGLE_MAP_ID=$NEXT_PUBLIC_GOOGLE_MAP_ID

ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm build

# ---- Stage 3: Production runner ----
FROM node:20-alpine AS runner

RUN apk add --no-cache libc6-compat

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=8083
ENV HOSTNAME="0.0.0.0"

# Non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Copy standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Install sharp for next/image optimization
RUN cd /tmp && npm init -y && npm install --os=linux --cpu=x64 sharp@latest && \
    cp -r node_modules/sharp /app/node_modules/sharp && \
    rm -rf /tmp/* /root/.npm

USER nextjs

EXPOSE 8083

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --spider -q http://localhost:8083 || exit 1

CMD ["node", "server.js"]