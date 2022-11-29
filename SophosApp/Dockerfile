# Build Environment
FROM node:18 AS builder

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install --silent

COPY . ./

RUN npm run build

# Production Environment
FROM nginx:1.23.1-alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
