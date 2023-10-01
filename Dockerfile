FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:ssr

ENV PORT=8000

ENV NODE_ENV=production

EXPOSE 8000

CMD [ "npm", "run", "serve:ssr" ]