'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('chapter', { 
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
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }, 
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }, 
      id_subject: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'course',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('chapter');
    
  }
};
