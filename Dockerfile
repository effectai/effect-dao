FROM node:14-alpine

ENV NODE_ENV=production \
    APP_ENV=production

COPY . /app
WORKDIR /app
RUN npm ci

EXPOSE 3000
ENTRYPOINT ["npm", "run", "dev"]
