#!/bin/sh
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
node bin/www
