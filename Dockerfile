FROM node:15.3.0-alpine

LABEL maintainer="whosyourdaddytheband@gmail.com"

WORKDIR /home/node/app

COPY backend/package*.json ./

RUN npm install

COPY backend .

EXPOSE 4000

CMD [ "node", "index.js" ]
