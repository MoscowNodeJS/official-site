FROM node:6

ADD . /app

RUN \
  npm install -g forever && \
  cd /app && \
  npm install --quiet && \
  npm run build

WORKDIR /app

CMD forever server.js

EXPOSE 80
