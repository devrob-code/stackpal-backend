FROM node:16 as dependencies

WORKDIR /home/app
COPY . /home/app
RUN npm install

# FROM dependencies as test
# #RUN npm run lint
# #RUN npm run lint && \
# #    npm run test

FROM dependencies as prebuild
RUN npm run build
RUN npm prune --omit=dev && \
    rm -rf test

FROM node:16 as build
RUN adduser  --disabled-password stackpaluser
WORKDIR /home/stackpaluser/app
RUN chown -R stackpaluser:stackpaluser ./
USER stackpaluser
COPY --chown=stackpaluser --from=prebuild /home/app .
CMD ["npm", "run", "typeorm:migrate"]
CMD ["npm", "run", "start:prod"]