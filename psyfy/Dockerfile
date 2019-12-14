
FROM node:10-alpine as react-build
RUN mkdir /client
WORKDIR /client
COPY package*.json /client/
COPY . /client/
RUN npm install
RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /client/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]