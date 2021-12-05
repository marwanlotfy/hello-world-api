FROM node:14-alpine3.14

ARG NODE_ENV

ENV APP_PORT=3000

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]