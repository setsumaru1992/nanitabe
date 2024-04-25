FROM node:18

ARG appname=nanitabe_front
ARG apppath="/root/$appname"

WORKDIR $apppath

COPY package.json yarn.lock ./

RUN yarn install

CMD [ "./entrypoint.sh" ]
