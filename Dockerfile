# Use Ubuntu as base
FROM ubuntu:latest

# Avoid interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install Node.js, npm, git, build tools
RUN apt-get update && \
    apt-get install -y curl git build-essential python3 && \
    rm -rf /var/lib/apt/lists/*

# Install Node.js (LTS)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    node -v && npm -v

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy all source files
COPY . .

# Build NestJS app
RUN npm run build

# Expose port (default NestJS port)
EXPOSE 3000

# Start the app
CMD ["node", "dist/main.js"]
