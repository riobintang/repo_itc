function createModelUser(Sequelize, DataTypes) {
  const User = Sequelize.define(
    "User",
    {
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
      fullName: {
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
      generation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      id_division: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "division",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: 'id_division',
      },
      id_role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "role",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: 'id_role',
      },
    },
    {
      tableName: "users",
    }
  );

  return User;
}

module.exports = createModelUser;
