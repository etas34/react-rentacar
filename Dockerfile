# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /code/app

# add `/app/node_modules/.bin` to $PATH
ENV NODE_ENV development

# install app dependencies
COPY package.json /code/app
COPY package-lock.json /code/app
RUN npm install --silent

# add app
COPY ./ /code/app

EXPOSE 3000

# start app
CMD ["npm", "start"] 