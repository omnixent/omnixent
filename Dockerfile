FROM node:lts-alpine

WORKDIR /app

RUN chmod -R 755 /app && \
  chown -R node:node  /app

RUN apk add --no-cache bash

USER node

COPY --chown=node:node ./package*.json ./
COPY --chown=node:node ./yarn.lock ./
RUN yarn install

COPY --chown=node:node . .
RUN yarn build

CMD [ "node", "dist/main.js" ]