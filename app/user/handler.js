const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");

const { User } = require("../../models");
const generateAccessToken = require("../../utils/tokenManager");
const {
  validateRegisterUserSchema,
  validateLoginUserSchema,
} = require("../../validator/user");

const Op = Sequelize.Op;

module.exports = {
  handlerRegisterUser: async (req, res, next) => {
    try {
      const { username, fullName, email, password, id_division } = req.body;
      validateRegisterUserSchema(req.body);
      const checkEmail = await User.findOne({
        where: {
          email: email,
        },
      });
      const checkUsername = await User.findOne({
        where: {
          username: username,
        },
      });
      if (checkEmail) {
        throw new Error("Email address already in use");
      }
      if (checkUsername) {
        throw new Error("Username already in use");
      }
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
      next(error);
    }
  },
  handlerUserLogin: async (req, res, next) => {
    try {
      const { emailUsername, password } = req.body;
      validateLoginUserSchema(req.body);
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
        attributes: {exclude: ["createdAt", "updatedAt"]},
      });

      if (!user) {
        throw new Error("User not found");
      }

      const passwordValidate = bcrypt.compareSync(password, user.password);
      if (!passwordValidate) {
        throw new Error("Invalid password");
      }

      const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.id_role,
      });

      res.status(200).json({
        status: "success",
        data: { 
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            fullName: user.fullName, 
            role: user.id_role,
        }, accessToken },
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id,
        {attributes: {exclude:["createdAt", "updatedAt"]}
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