function createModelChapter(Sequelize, DataTypes) {
  const Chapter = Sequelize.define(
    "Chapter",
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
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      id_course: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "course",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "chapters",
    }
  );

  Chapter.associate = (models) => {
    Chapter.belongsTo(models.Course, {
      foreignKey: "id_course",
      as: "materi",
    });
    Chapter.hasMany(models.Article, {
      foreignKey: "id_chapter",
      as: "article",
    });
  };

  return Chapter;
}

module.exports = createModelChapter;
