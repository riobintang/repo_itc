const rolesServices = require("../../services/mysql/roleService");

module.exports = {
  getAllRoleHandler: async (req, res, next) => {
    try {
      const roles = await rolesServices.getAllRoles();
      res.status(200).json({
        status: "success",
        message: "Successfully get Roles",
        data: roles,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetRoleById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const role = await rolesServices.getRoleById(id);
      res.status(200).json({
        status: 'success',
        data: role,
      })
    } catch (error) {
      next(error);
    }
  },
};
