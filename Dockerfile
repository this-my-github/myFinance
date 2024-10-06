FROM node:18

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/frontend
RUN npm i
RUN npm run build

WORKDIR /usr/src/app/backend
RUN npm i

EXPOSE 3003

CMD ["node", "app.js"]
