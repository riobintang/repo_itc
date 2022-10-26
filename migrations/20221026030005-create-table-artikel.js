'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('artikel', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      }, 
      judul_artikel: {
        type: Sequelize.STRING,
        allowNull: false,
      }, 
      isi: {
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
      id_bab: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'bab',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('artikel');
    
  }
};
