FROM node:7.3

COPY . /opt/static
WORKDIR /opt/static

ARG API_PORT
ENV API_URL "http://api:$API_PORT"

RUN npm install -g yarn
RUN yarn install

EXPOSE 3000
CMD yarn start
