'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('comments', [
      {
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        isEdited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_user: 1,
        id_discussion: 1,
      },
      {
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        isEdited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_user: 1,
        id_discussion: 1,
      },
      {
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        isEdited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_user: 1,
        id_discussion: 1,
      },
      {
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        isEdited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_user: 1,
        id_discussion: 2,
      },
      {
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        isEdited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_user: 1,
        id_discussion: 2,
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('comments', null, {});
  },
};
