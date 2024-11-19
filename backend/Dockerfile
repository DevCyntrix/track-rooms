FROM node:22-alpine

RUN mkdir /data
COPY . /data
WORKDIR /data
RUN yarn install --frozen-lockfile
RUN yarn run build
CMD [ "yarn", "run", "start:prod" ]