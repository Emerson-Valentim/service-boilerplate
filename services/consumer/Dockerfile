FROM node:lts-alpine

WORKDIR /home/ubuntu

COPY .env .

COPY package.json .

RUN yarn install

CMD tail -f /dev/null