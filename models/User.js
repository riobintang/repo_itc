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
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
      photoProfile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
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
      verify: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      otp: {
        type: DataTypes.INTEGER(5),
        allowNull: true,
      },
      unique_token: {
        type: DataTypes.STRING(256),
        unique: true,
      },
    },
    {
      tableName: "users",
    }
  );

  return User;
}

module.exports = createModelUser;
