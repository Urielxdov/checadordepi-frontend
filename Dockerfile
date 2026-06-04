FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_ADMIN_URL=/api/admin
ARG VITE_CLIENT_URL=/api/client
ENV VITE_ADMIN_URL=$VITE_ADMIN_URL
ENV VITE_CLIENT_URL=$VITE_CLIENT_URL
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
