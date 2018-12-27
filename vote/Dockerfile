FROM node:10.3.0-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm set registry=http://registry.npm.taobao.org
RUN npm install --production
CMD ["node","index.js"]
