FROM node:14

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 8000

RUN yarn build


CMD ["node", "./dist"]
