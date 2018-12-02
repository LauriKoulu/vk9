FROM node:8

COPY package*.json ./

RUN npm install && npm install -g json-server

#bundle
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]