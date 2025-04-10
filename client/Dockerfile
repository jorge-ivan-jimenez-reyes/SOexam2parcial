# Build stage
FROM node:14 as build

WORKDIR /app

COPY clienteso/package*.json ./

RUN npm install

COPY clienteso/ .

RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Add nginx configuration to handle React Router
COPY clienteso/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
