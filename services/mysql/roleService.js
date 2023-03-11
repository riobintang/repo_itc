const { Role, sequelize } = require("../../models");

const rolesServices = {
  getAllRoles: async () => {
    const roles = await Role.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      order: sequelize.col("id"),
    });

    return roles;
  },
  getRoleById: async (id) => {
    const role = await Role.findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!role) {
      throw new Error("Role not found");
    }
    return role;
  },
};

module.exports = rolesServices;
