FROM node

WORKDIR /app

COPY yarn.lock .

COPY package.json .

RUN yarn install

COPY . .

CMD [ "yarn", "start" ]