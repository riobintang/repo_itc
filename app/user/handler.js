const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");

const { User, Division } = require("../../models");
const { validateRegisterUserSchema } = require("../../validator/user");

const Op = Sequelize.Op;

module.exports = {
  handlerRegisterUser: async (req, res, next) => {
    try {
      
      const { username, fullName, email, password, division } = req.body;
      validateRegisterUserSchema(req.body);
      const id_division = await Division.findOne({
       attributes: ["id"],
       where: {
         divisionName: {
            [Op.like]: `%${division}%`,
         },
       },
      });
      const hashPassword = await bcrypt.hash(password, 10);
      const role = 1;
    

      await User.create({
        username: username,
        fullName: fullName,
        email: email,
        password: hashPassword,
        id_division: id_division,
        id_role: role,
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
      // throw new Error(error);
      console.log(error.message);
      next(error);
    }
  },
};
