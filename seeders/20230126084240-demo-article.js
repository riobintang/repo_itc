'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('articles', [
      {
        title: 'Article 1',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor tortor mauris, et dictum lorem blandit quis. Aenean semper sed.',
        createdAt: new Date(),
        updatedAt: new Date(),
        id_chapter: 1,
      },
      {
        title: 'Article 2',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor tortor mauris, et dictum lorem blandit quis. Aenean semper sed.',
        createdAt: new Date(),
        updatedAt: new Date(),
        id_chapter: 1,
      },
      {
        title: 'Article 3',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor tortor mauris, et dictum lorem blandit quis. Aenean semper sed.',
        createdAt: new Date(),
        updatedAt: new Date(),
        id_chapter: 1,
      },
      {
        title: 'Article 1',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor tortor mauris, et dictum lorem blandit quis. Aenean semper sed.',
        createdAt: new Date(),
        updatedAt: new Date(),
        id_chapter: 2,
      },
      {
        title: 'Article 2',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor tortor mauris, et dictum lorem blandit quis. Aenean semper sed.',
        createdAt: new Date(),
        updatedAt: new Date(),
        id_chapter: 2,
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('articles', null, {});
  },
};