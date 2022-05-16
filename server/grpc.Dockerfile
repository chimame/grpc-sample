FROM node:16.14-bullseye-slim

WORKDIR /app

COPY ./package.json /app/
RUN npm install

COPY ./server.js /app/
COPY ./helloworld.proto /app/

CMD [ "node", "server.js" ]
