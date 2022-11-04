const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const { User, Role, Division } = require("../../models");
const { checkUniqueRegister } = require("./functionDBUser");

const generateAccessToken = require("../../utils/tokenManager");
const {
  validateRegisterUserSchema,
  validateLoginUserSchema,
} = require("../../validator/user");

const Op = Sequelize.Op;

module.exports = {
  //handler for register user
  handlerRegisterUser: async (req, res, next) => {
    try {
      const { username, fullName, email, password, id_division } = req.body;
      validateRegisterUserSchema(req.body);
      checkUniqueRegister(email, username, next); //check unique username and email
      const hashPassword = await bcrypt.hash(password, 10);
      const role = await Role.findOne({
        where: {
          roleName: "User",
        }
      });
      await User.create({
        username: username,
        fullName: fullName,
        email: email,
        password: hashPassword,
        id_division: id_division,
        id_role: role.id,
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
  //handler for login user
  handlerUserLogin: async (req, res, next) => {
    try {
      const { emailUsername, password } = req.body;
      validateLoginUserSchema(req.body);
      //get User from db
      const user = await User.findOne({
        where: {
          [Op.or]: [
            {
              email: emailUsername,
            },
            {
              userName: emailUsername,
            },
          ],
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [{model: Role }, {model: Division}],
      });

      if (!user) {
        throw new Error("User not found");
      }

      const passwordValidate = bcrypt.compareSync(password, user.password);
      if (!passwordValidate) {
        //validate password
        throw new Error("Invalid password");
      }
      //generate access token
      const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.Role.roleName,
        division: user.Division.divisionName,
      });

      res.status(200).json({
        status: "success",
        data: {
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            fullName: user.fullName,
            id_role: user.id_role,
            id_division: user.id_division,
            accessToken,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  },
  //handler for get user by id
  handlerGetUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (!user) {
        throw new Error("User not found");
      }
      res.status(200).json({
        status: "success",
        message: "Successfully get user by id",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
};
