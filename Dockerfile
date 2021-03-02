FROM node:12.0.0
WORKDIR /usr/src/app
COPY package*.json ./
ENV PORT 5000
RUN npm install -g nodemon
RUN npm install pm2 -g
RUN npm cache clear --force && npm install
ENTRYPOINT ["npm", "start"]