FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build


EXPOSE 3333

# Command to run the app
CMD [  "npm", "run", "start:migrate:prod" ]