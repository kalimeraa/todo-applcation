FROM node:14.8.0-stretch

RUN apt update && apt-get -y install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb

RUN apt-get autoremove --purge -y libpq-dev apt-get clean; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

CMD ["npm","run","serve"]
