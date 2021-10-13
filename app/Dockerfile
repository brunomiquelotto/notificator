FROM node:12.18.3

WORKDIR /app

COPY ["package.json", "./"]

RUN yarn install --production

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]