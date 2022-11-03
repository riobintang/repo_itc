function createModelToken(Sequelize, DataTypes) {
  const Token = Sequelize.define(
    "Token",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      token: {
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
    },
    {
      tableName: "tokens",
    }
  );
  Token.assoicate = (models) => {
    Token.belongsTo(models.User, {
      foreignKey: "id_user",
      as: "user",
    });
  };

  return Token;
}

module.exports = createModelToken;
