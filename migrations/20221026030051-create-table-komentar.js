'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('komentar', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      }, 
      isi_komentar: {
        type: Sequelize.STRING,
        allowNull: false,
      },  
      isEdited: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      }, 
      cretaedAt: {
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
      id_diskusi: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'diskusi',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }, 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('komentar');
    
  }
};
