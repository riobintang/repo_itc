function applyExtraSetup(sequelize) {
    const { User, Role, Division } = sequelize.models;

    Role.hasMany(User, {
        foreignKey: "id_role",
        sourceKey: 'id',
      });
    User.belongsTo(Role, {
        foreignKey: "id_role",
        targetKey: 'id'
      });

    Division.hasMany(User, {
        foreignKey: "id_role",
        sourceKey: 'id',
      });
    User.belongsTo(Division, {
        foreignKey: "id_division",
        targetKey: 'id'
      });
}

module.exports = {applyExtraSetup};