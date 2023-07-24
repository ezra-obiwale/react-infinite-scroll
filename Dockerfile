# base
FROM node:lts-alpine3.16 as base

RUN apk update && apk add zip unzip libzip-dev git

WORKDIR /app

# build
FROM base as build

COPY --chown=1000:1000 package.json ./
COPY --chown=1000:1000 yarn.lock ./

RUN yarn

COPY --chown=1000:1000 . .

RUN yarn build
