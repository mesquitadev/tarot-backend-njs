#Build
FROM node:latest AS frontend
WORKDIR /app
COPY . /app
RUN ls
RUN cd /app && npm install --legacy-peer-deps && npm run build
