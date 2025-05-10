# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install Expo CLI globally
RUN npm install -g expo-cli

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Set environment variables
ENV NODE_ENV=development
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV EXPO_DEVTOOLS_PORT=19001
ENV EXPO_PACKAGER_PROXY_URL=http://localhost:19000
ENV REACT_NATIVE_PACKAGER_HOSTNAME=0.0.0.0

# Expose the default Expo port
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
EXPOSE 8081

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:19000 || exit 1

# Start the application
CMD ["npx", "expo", "start", "--lan", "--port", "19000"]