FROM node:12.21.0-alpine

WORKDIR /usr/app

COPY ./dist ./

COPY package*.json ./

RUN npm i --production

CMD ["node", "main.js"]