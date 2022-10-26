function createModelDivision(Sequelize, DataTypes) {
  const Division = Sequelize.define("Division", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    divisionName: {
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
  });

  Division.associate = (models) => {
    Division.hasMany(models.User, {
      foreignKey: "id_division",
      as: "user",
    });
    Division.hasMany(models.Course, {
      foreignKey: "id_division",
      as: "course",
    });
  };

  return Division;
}

module.exports = createModelDivision;
