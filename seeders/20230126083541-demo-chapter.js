'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('chapters', [
      {
        title: 'Chapter 1',
        createdAt: new Date(),
        updatedAt: new Date(),
        id_course: 1,
      },
      {
        title: 'Chapter 2',
        createdAt: new Date(),
        updatedAt: new Date(),
        id_course: 1,
      },
      {
        title: 'Chapter 3',
        createdAt: new Date(),
        updatedAt: new Date(),
        id_course: 1,
      },
      {
        title: 'Chapter 1',
        createdAt: new Date(),
        updatedAt: new Date(),
        id_course: 2,
      },
      {
        title: 'Chapter 2',
        createdAt: new Date(),
        updatedAt: new Date(),
        id_course: 2,
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('chapters', null, {});
  },
};
