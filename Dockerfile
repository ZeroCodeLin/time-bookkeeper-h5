FROM nginx

# COPY ./script/nginx/nginx.conf /etc/nginx/
COPY /usr/local/nginx/conf/nginx.conf /etc/nginx/
COPY ./dist /web/
