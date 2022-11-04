function createModelDivision(Sequelize, DataTypes) {
  const Division = Sequelize.define(
    "Division",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id',
      },
      divisionName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'divisionName',
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
      tableName: "divisions",
    }
  );

  return Division;
}

module.exports = createModelDivision;
