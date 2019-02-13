# Source: https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

FROM node:8
WORKDIR /usr/src/stockx-challenge
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]
