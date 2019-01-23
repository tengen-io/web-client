FROM node:10

WORKDIR /usr/src/go_stop
COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 8080

CMD ["npm", "run", "prod"]
