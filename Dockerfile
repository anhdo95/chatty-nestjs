FROM node:10-alpine
WORKDIR /usr/src/app

RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base \
  && pip install virtualenv \
  && rm -rf /var/cache/apk/*

COPY . .
RUN npm install rimraf -g
RUN npm install

EXPOSE 3000
CMD [ "npm", "run", "start" ]
