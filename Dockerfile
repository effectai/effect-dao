FROM node:14-alpine

WORKDIR /app

RUN apk update && apk upgrade
RUN apk add git

COPY ./package.json /app/

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 3000
ENV PATH ./node_modules/.bin/:$PATH
