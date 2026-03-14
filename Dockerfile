# Этап 1: Сборка (Build)
FROM node:20-alpine AS build-stage

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все остальные файлы исходного кода
COPY . .

# Собираем проект (Vite создаст папку dist)
RUN npm run build

# Этап 2: Раздача (Production)
FROM nginx:alpine

# Удаляем стандартные файлы Nginx
RUN rm -rf /usr/share/nginx/html/*

# Копируем только собранные файлы (dist) из этапа сборки
# Если вы используете vite-plugin-singlefile, папка dist все равно будет создана
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Настройка Nginx для корректной работы React Router (если используете)
# Создаем простой конфиг для обработки SPA
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]