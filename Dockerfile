FROM node:10 as build

WORKDIR /usr/src/go_stop
COPY package*.json ./

RUN npm install --silent
COPY . .
RUN npm run-script build

FROM nginx:stable
COPY --from=build /usr/src/go_stop/dist/ /usr/share/nginx/html
