function createModelDiscussion(Sequelize, DataTypes) {
  const Discussion = Sequelize.define(
    "Discussion",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
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
      id_subject: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "subject",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "discussions",
    }
  );

  Discussion.associate = (models) => {
    Discussion.belongsTo(models.User, {
      foreignKey: "id_user",
      as: "user",
    });
    Discussion.belongsTo(models.Course, {
      foreignKey: "id_course",
      as: "course",
    });
    Discussion.hasMany(models.Comment, {
      foreignKey: "id_discussion",
      as: "comment",
    });
  };

  return Discussion;
}

module.exports = createModelDiscussion;
