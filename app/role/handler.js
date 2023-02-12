const { Role } = require("../../models");
module.exports = {
  getAllRoleHandler: async (req, res, next) => {
    try {
      const role = await Role.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json({
        status: "success",
        message: "Successfully get division",
        data: role,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetRoleById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const role = await Role.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      if (!role) {
        throw new Error("Role not found");
      }
      res.status(200).json({
        status: 'success',
        data: role,
      })
    } catch (error) {
      next(error);
    }
  },
};
