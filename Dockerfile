FROM node:latest
WORKDIR /home/app
COPY . .
RUN npm install -g npm@10.2.4
RUN npm install
RUN ["chmod","+x","./migration-seed.sh"]
EXPOSE 3000
ENTRYPOINT [ "bash","./migration-seed.sh" ]