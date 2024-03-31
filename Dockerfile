FROM node:20 as builder

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN rm -rf node_modules

FROM node:20-alpine

ENV DOCKERIZE_VERSION v0.7.0

RUN apk update --no-cache \
    && apk add --no-cache wget openssl \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apk del wget

WORKDIR /app

COPY --from=builder /app .

EXPOSE 3000

