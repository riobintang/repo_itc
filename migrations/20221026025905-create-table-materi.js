'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('materi', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      }, 
      judul_materi: {
        type: Sequelize.STRING,
        allowNull: false,
      }, 
      deskripsi: {
        type: Sequelize.STRING,
        allowNull: false,
      }, 
      image_thumbnail: {
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
      id_divisi: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'divisi',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }, 
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }, 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('materi');
    
  }
};
