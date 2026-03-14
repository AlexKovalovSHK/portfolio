FROM nginx:alpine

# Удаляем дефолтные файлы nginx, чтобы они не мешались
RUN rm -rf /usr/share/nginx/html/*

# Копируем конкретно твой собранный файл из папки dist
COPY dist/index.html /usr/share/nginx/html/index.html

EXPOSE 80