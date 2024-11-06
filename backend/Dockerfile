FROM node:18-alpine

WORKDIR /app

# Install development tools and dependencies
RUN apk add --no-cache python3 make g++ gcc

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Create uploads directory
RUN mkdir -p uploads

EXPOSE 4000

# Start the application with hot reloading
CMD ["npm", "run", "dev"]