FROM node:22 AS development

LABEL maintainer="Hugo OTUSZEWSKI <hotuszewski@my-digital-school.org>"

RUN mkdir -p /home/app
WORKDIR /home/app
COPY ../app /home/app/

RUN chmod 1777 /tmp

RUN apt-get update && \
    apt-get install -y chromium --no-install-recommends

ENV NODE_ENV=development

RUN npm install -g nodemon @babel/node
RUN npm install

CMD [ "npm", "run", "start:dev" ]
