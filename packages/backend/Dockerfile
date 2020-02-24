FROM node:12.13-alpine

WORKDIR /usr/src/app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

CMD yarn start:prod --bind 0.0.0.0:$PORT
