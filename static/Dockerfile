FROM node:7.3

COPY . /opt/static
WORKDIR /opt/static

RUN yarn install

EXPOSE 3000
CMD yarn start