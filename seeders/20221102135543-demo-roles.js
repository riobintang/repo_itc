"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("roles", [
      {
        id: 1,
        roleName: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2, 
        roleName: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("roles", null, [{}]);
  },
};
