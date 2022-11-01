const { Division } = require("../../models");

module.exports = {
  handlerGetDivision: async (req, res, next) => {
    try {
      const division = await Division.findAll({
        attributes: {exclude: ["createdAt", "updatedAt"]}
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
};
