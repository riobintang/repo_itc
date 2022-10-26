function createModelUser(Sequelize, DataTypes){
    const User = Sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      nama_lengkap: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      angkatan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      noHP: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      id_divisi: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'divisi',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'role',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });

    User.assoicate = (models) => {
      User.belongsTo(models.Divisi, {
        foreignKey: 'id_divisi',
        as: 'divisi',
      });
      User.belongsTo(models.Role, {
        foreignKey: 'id_role',
        as: 'role',
      });
    };
    
    return User;
}

module.exports = createModelUser;