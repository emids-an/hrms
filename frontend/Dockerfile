FROM node:18-alpine

WORKDIR /app

# Install dependencies for serving static files
RUN npm install -g http-server

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the application
COPY . .

# Build Tailwind CSS
RUN npm run build:css

EXPOSE 3000

# Start the development server with hot reloading
CMD ["npm", "run", "dev"]