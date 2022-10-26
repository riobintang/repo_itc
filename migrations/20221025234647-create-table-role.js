'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('role', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      }, 
      roleName: {
        type: Sequelize.STRING,
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
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('role');
    
  }
};
