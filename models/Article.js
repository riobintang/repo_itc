function createModelArticle(Sequelize, DataTypes) {
  const Article = Sequelize.define("article", {
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    id_chapter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "chapter",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  });

  Article.associate = (models) => {
    Article.belongsTo(models.Chapter, {
      foreignKey: "id_chapter",
      as: "chapter",
    });
  };

  return Article;
}

module.exports = createModelArticle;
