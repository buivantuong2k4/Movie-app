# --- Build stage: build React ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Vite -> dist | CRA -> build (xem bước 2 nếu CRA)
RUN npm run build

# --- Runtime stage: Nginx serve static files ---
FROM nginx:alpine
# Nginx config: cache + SPA fallback
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Vite: copy dist; (nếu CRA đổi thành /app/build ở bước 2)
COPY --from=build /app/dist /usr/share/nginx/html
