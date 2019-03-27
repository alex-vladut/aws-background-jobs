FROM node:10-slim

WORKDIR /usr/app

COPY ./package.json /usr/app/package.json
COPY ./package-lock.json /usr/app/package-lock.json
COPY . /usr/app

RUN npm install