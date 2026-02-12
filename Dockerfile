# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./

# Garante que todas as dependencias (incluindo devDependencies como Vite) sejam instaladas
ENV NODE_ENV=development
RUN npm install

COPY . .

# Corrige permissões de execução do binário do vite
RUN chmod +x node_modules/.bin/vite

# Tenta buildar usando npx para garantir resolução correta
RUN npx vite build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
