FROM node:14

WORKDIR /

COPY ./package.json ./package-lock.json ./

RUN npm i

COPY . .

WORKDIR /

EXPOSE 80

WORKDIR /

ENV PORT=80 MONGO_URI="mongodb+srv://GilMaor:T4Cb0LFfDAxWTLSG@final.og3j5.mongodb.net/Final?retryWrites=true&w=majority" REFRESH_TOKEN_SECRET="tcdsvu" ACCESS_TOKEN_SECRET="uzjyh"

CMD ["node", "app.js"]