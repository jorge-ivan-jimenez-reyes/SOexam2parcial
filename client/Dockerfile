# Build stage
FROM node:18 as build

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml (if available)
COPY clienteso/package.json clienteso/pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application
COPY clienteso/ ./

# Create .env file
RUN echo "VITE_API_URL=http://localhost/api" > .env

# Build the application
RUN pnpm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Add nginx configuration to handle React Router
COPY clienteso/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
