FROM node:13.12.0-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "app.js"]