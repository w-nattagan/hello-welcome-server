# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the working directory
COPY package*.json ./

# Install application dependencies
RUN yarn install

# Copy the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Define the command to run your application
CMD ["yarn", "start"]
