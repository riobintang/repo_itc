"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", [
      {
        id: 1,
        username: "adminitc",
        fullName: "Faisal",
        email: "faisalreza@faisal.com",
        password: await bcrypt.hash("randomsecret", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
        id_division: 3,
        id_role: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, [{}]);
  },
};
