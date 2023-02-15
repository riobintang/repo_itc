
const divisionsServices = require("../../services/mysql/divisionService");
module.exports = {
  //handler get division
  handlerGetDivision: async (req, res, next) => {
    try {
      const divisions = await divisionsServices.getAllDivisions();
      res.status(200).json({
        status: "success",
        message: "Successfully get division",
        data: divisions,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetDivisionById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const division = await divisionsServices.getDivisionById(id);
      res.status(200).json({
        status: 'success',
        data: division,
      })
    } catch (error) {
      next(error);
    }
  },
};
