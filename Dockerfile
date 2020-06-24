FROM node:alpine

WORKDIR /var/www

COPY . .

RUN ["sh", "./install.sh"]

EXPOSE 3000

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

