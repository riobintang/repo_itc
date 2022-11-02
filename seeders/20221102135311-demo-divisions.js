"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("divisions", [
      {
        id: 1,
        divisionName: "Back End",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        divisionName: "Front End",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        divisionName: "Mobile",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("divisions", null, {});
  },
};
