FROM node:16-alpine

RUN npm install swagger-ui-watcher -g

ENTRYPOINT ["swagger-ui-watcher", "--no-open", "--host", "0.0.0.0"]

VOLUME ["/swagger"]

EXPOSE 8000