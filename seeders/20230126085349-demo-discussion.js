'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('discussions', [
      {
        title: 'Discussion 1',
        body: 'Lorem ipsum dolor sit amet',
        isEdited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_user: 1,
        id_course: 1,
      },
      {
        title: 'Discussion 2',
        body: 'Lorem ipsum dolor sit amet',
        isEdited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_user: 1,
        id_course: 1,
      },
      {
        title: 'Discussion 3',
        body: 'Lorem ipsum dolor sit amet',
        isEdited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_user: 1,
        id_course: 1,
      },
      {
        title: 'Discussion 1',
        body: 'Lorem ipsum dolor sit amet',
        isEdited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_user: 1,
        id_course: 2,
      },
      {
        title: 'Discussion 2',
        body: 'Lorem ipsum dolor sit amet',
        isEdited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_user: 1,
        id_course: 2,
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('discussions', null, {});
  },
};