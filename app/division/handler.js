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
  handlerGetDivisionByID: async (req, res, next) => {
    try {
      const division = await Division.findOne({
        where: {
          id: id,
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json({
        status: 'success',
        data: division,
      })
    } catch (error) {
      next(error);
    }
  },
};
