'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('diskusi', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      }, 
      judul_pertanyaan: {
        type: Sequelize.STRING,
        allowNull: false,
      }, 
      isi_pertanyaan: {
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
          model: 'user',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }, 
      id_materi: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'materi',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }, 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('diskusi');
  }
};
