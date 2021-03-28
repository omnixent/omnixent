FROM node:14

EXPOSE 3000

WORKDIR /app

ADD . .

RUN npm install
RUN npm run build
RUN ls

CMD ["yarn", "run:docker"]
