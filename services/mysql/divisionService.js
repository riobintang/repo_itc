const { Division } = require("../../models");

const divisionsService = {
  getAllDivisions: async () => {
    const divisions = await Division.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return divisions;
  },
  getDivisionById: async (id) => {
    const division = await Division.findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!division) {
      throw new Error("Division not found");
    }
    return division;
  },
};

module.exports = divisionsService;
