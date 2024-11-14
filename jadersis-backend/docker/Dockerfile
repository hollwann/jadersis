FROM node:22-alpine

WORKDIR /app

# first copy just the package and the lock file, for caching purposes
COPY package*.json ./

# install dependencies
RUN npm i

# copy the entire project
COPY . .

# build
RUN npm run build

EXPOSE 3001
CMD [ "npm", "run", "start" ]
