const bcrypt = require("bcrypt");

const { User, Division } = require("../../models");
const { validateRegisterUserChema } = require("../../validator/user");

module.exports = {
  handlerRegisterUser: async (req, res, next) => {
    try {
      const { username, fullName, email, password, division } = req.body;
      validateRegisterUserChema(req.body);
      const hashPassword = await bcrypt.hash(password, 10);

      const id_division = await Division.findOne({
        attributes: ["id"],
        where: {
          divisionName: division,
        },
      });
      await User.create({
        username,
        fullName,
        email,
        hashPassword,
        id_division,
      });
      res.status(200).json({
        status: "success",
        message: "Successfully register user",
        data: await User.findOne({
          attributes: { exclude: ["password", "createdAt", "updatedAt"] },
          order: [["createdAt", "DESC"]], //to send last data inserted to database
        }),
      });
    } catch (error) {
      next(error);
    }
  },
};
