function createModelRefreshToken(Sequelize, DataTypes) {
    const RefreshToken = Sequelize.define(
      "RefreshToken",
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
        refresh_token: {
          type: DataTypes.STRING(256),
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
        tableName: "refresh_tokens",
      }
    );

    return RefreshToken;
  }
  
  module.exports = createModelRefreshToken;
  