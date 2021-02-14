# FROM nginx:alpine

# COPY nginx.conf /etc/nginx/nginx.conf

# WORKDIR /usr/share/nginx/html
# COPY dist/browser .

# RUN ls -l /usr/share/nginx/html

FROM nginx:alpine

ARG PORT

RUN echo $PORT

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY . .

RUN ls -l /usr/share/nginx/html

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/nginx.conf && nginx -g 'daemon off;'
