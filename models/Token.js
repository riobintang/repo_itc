const sequelizeTokenify = require("sequelize-tokenify");


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
      otp: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
      },
      token: {
        type: DataTypes.TEXT("long"),
        unique: true,
      },
      valid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
  
  sequelizeTokenify.tokenify(Token, {
    field: 'token',
    length: 250,
  })

  Token.assoicate = (models) => {
    Token.belongsTo(models.User, {
      foreignKey: "id_user",
      as: "user",
    });
  };

  return Token;
}

module.exports = createModelToken;
