'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('divisions', [
      {
        id: 1,
        divisionName: 'Back-end Developer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        divisionName: 'Front-end Developer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        divisionName: 'Mobile Developer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        divisionName: 'Public Relations',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        divisionName: 'Project Manager',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('divisions', null, {});
  },
};