const { Division } = require("../../models");

module.exports = {
  //handler get division
  handlerGetDivision: async (req, res, next) => {
    try {
      const division = await Division.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json({
        status: "success",
        message: "Successfully get division",
        data: division,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetDivisionById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const division = await Division.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      if (!division) {
        throw new Error("Division not found");
      }
      res.status(200).json({
        status: 'success',
        data: division,
      })
    } catch (error) {
      next(error);
    }
  },
};
