FROM nginx

COPY ./script/nginx/nginx.conf /etc/nginx/
COPY ./dist /web/
