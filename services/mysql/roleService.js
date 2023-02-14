const { Role } = require("../../models");

const rolesService = {
  getAllRoles: async () => {
    const roles = await Role.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
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

module.exports = rolesService;
