# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Recebe argumentos do build
ARG DATABASE_URL
ARG SECRETKEY
ARG EXPIRESIN
ARG GIT_SHA

# Exporta como variáveis de ambiente para o build
ENV DATABASE_URL=$DATABASE_URL
ENV SECRETKEY=$SECRETKEY
ENV EXPIRESIN=$EXPIRESIN
ENV GIT_SHA=$GIT_SHA

COPY package*.json ./
RUN npm install
COPY . .

# Gera o arquivo .env para o build (caso o build precise)
RUN echo "DATABASE_URL=$DATABASE_URL\nSECRETKEY=$SECRETKEY\nEXPIRESIN=$EXPIRESIN\nGIT_SHA=$GIT_SHA" > .env

RUN npm run build

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

ARG DATABASE_URL
ARG SECRETKEY
ARG EXPIRESIN
ARG GIT_SHA

COPY package*.json ./
RUN npm install --production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Gera o arquivo .env com os valores dos argumentos
RUN echo "DATABASE_URL=$DATABASE_URL\nSECRETKEY=$SECRETKEY\nEXPIRESIN=$EXPIRESIN\nGIT_SHA=$GIT_SHA" > .env

EXPOSE 3000
CMD ["node", "dist/main.js"]
