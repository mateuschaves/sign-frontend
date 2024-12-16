FROM node:18 as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build --prod

FROM nginx:alpine

COPY --from=build-stage /app/dist/sign-frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
