FROM node:20.14.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", ".output/server/index.mjs" ]
