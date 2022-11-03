function createModelComment(Sequelize, DataTypes) {
  const Comment = Sequelize.define("comment", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isEdited: {
      type: DataTypes.BOOLEAN,
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
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    id_discussion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "discussion",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: "id_user",
      as: "user",
    });
    Comment.belongsTo(models.Discussion, {
      foreignKey: "id_discussion",
      as: "discussion",
    });
  };

  return Comment;
}

module.exports = createModelComment;
