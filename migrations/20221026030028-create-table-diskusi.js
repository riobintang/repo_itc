'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('discussions', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      }, 
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      }, 
      body: {
        type: Sequelize.STRING,
        allowNull: false,
      }, 
      isEdited: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      }, 
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }, 
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }, 
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }, 
      id_course: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }, 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('discussions');
  }
};
