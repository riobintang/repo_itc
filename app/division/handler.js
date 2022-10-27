const { Division } = require("../../models");

module.exports = {
  handlerGetDivision: async (req, res, next) => {
    try {
      const division = await Division.findAll();
      res.status(200).json({
        status: "success",
        message: "Successfully get division",
        data: {
          id: division.id,
          divisionName: division.divisionName,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
