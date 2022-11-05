function createModelCourse(Sequelize, DataTypes) {
  const Course = Sequelize.define(
    "Course",
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_thumbnail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cloudinary_id: {
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
      id_division: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "division",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    },
    {
      tableName: "courses",
    }
  );

  Course.associate = (models) => {
    Course.belongsTo(models.Division, {
      foreignKey: "id_division",
      as: "divisi",
    });
    Course.belongsTo(models.User, {
      foreignKey: "id_user",
      as: "user",
    });
    Course.hasMany(models.Chapter, {
      foreignKey: "id_course",
      as: "chapter",
    });
  };

  return Course;
}

module.exports = createModelCourse;
