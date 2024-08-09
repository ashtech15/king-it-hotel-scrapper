# Use the official Node.js image.
FROM node:20 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Use a smaller image for production
FROM node:20 AS production

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app ./

# Install production dependencies only
RUN npm install --prod

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
