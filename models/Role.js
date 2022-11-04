function createModelRole(Sequelize, DataTypes) {
  const Role = Sequelize.define(
    "Role",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id',
      },
      roleName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'roleName',
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
      tableName: "roles",
    }
  );

  Role.associate = (models) => {
    Role.hasMany(models.User, {
      foreignKey: "id_role",
      as: "user",
    });
  };

  return Role;
}

module.exports = createModelRole;
