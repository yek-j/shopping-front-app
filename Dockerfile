FROM node:latest as build

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

# 빌드 시 환경 변수 사용
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build

# nginx
FROM nginx:stable-alpine3.20

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]