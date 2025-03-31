FROM node:22 AS production

LABEL maintainer="Hugo OTUSZEWSKI <hotuszewski@my-digital-school.org>"

RUN echo "Europe/Paris" > /etc/timezone && \
    ln -fs /usr/share/zoneinfo/Europe/Paris /etc/localtime && \
    apt-get update && apt-get install -y tzdata rsync && \
    dpkg-reconfigure --frontend noninteractive tzdata

RUN npm install -g pm2 @babel/node

WORKDIR /home/app
COPY ./app /home/app/

RUN chmod 1777 /tmp

ENV NODE_ENV=production

RUN npm install
RUN npm run build

EXPOSE 443

CMD [ "npm", "run", "start:prod" ]
