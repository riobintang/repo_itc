"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Divisions", [
      {
        divisionName: "Back End",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionName: "Front End",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionName: "Mobile",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Divisions", null, {});
  },
};
