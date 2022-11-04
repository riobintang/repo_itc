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
};
