FROM node:lts-alpine

WORKDIR /home/ubuntu

COPY package.json .

COPY build ./build

RUN yarn install

CMD tail -f /dev/null