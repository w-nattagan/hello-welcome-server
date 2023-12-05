FROM node:14

WORKDIR /app

COPY package*.json ./

# Use Yarn for installing dependencies
RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
