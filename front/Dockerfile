FROM node:16.14-bullseye-slim

RUN apt update && apt install -y protobuf-compiler

WORKDIR /app

COPY ./package.json ./package-lock.json /app/
RUN npm install
