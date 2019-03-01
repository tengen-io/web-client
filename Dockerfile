FROM node:10 as build

WORKDIR /usr/src/tengen
COPY package*.json ./

RUN npm install --silent
COPY . .
RUN npm run-script build

FROM nginx:stable
COPY --from=build /usr/src/tengen/build/ /usr/share/nginx/html
EXPOSE 80
