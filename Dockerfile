FROM node:latest
WORKDIR /usr/dev/learn-express
COPY package.json .
RUN npm install
COPY . .