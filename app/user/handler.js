const bcrypt = require("bcrypt");

const { User } = require("../../models");
const {
  findDetailUser,
  userFindByPK,
  userFindLastInsert,
  checkEmailAndUsername,
} = require("../../data-access/functionUserDB");

const generateAccessToken = require("../../utils/tokenManager");
const {
  validateRegisterUserSchema,
  validateLoginUserSchema,
} = require("../../validator/user");
const { findOneRoleByName } = require("../../data-access/functionRoleDB");

module.exports = {
  //handler for register user
  handlerRegisterUser: async (req, res, next) => {
    try {
      const { username, fullName, email, password, id_division } = req.body;
      validateRegisterUserSchema(req.body);
      //check unique username and email
      const checkUnique = await checkEmailAndUsername(email, username);
      if (checkUnique.checkEmail) {
        throw new Error("Email address already in use");
      }
      if (checkUnique.checkUsername) {
        throw new Error("Username already in use");
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const role = await findOneRoleByName("User");
      console.log(role);
      await User.create({
        username: username,
        fullName: fullName,
        email: email,
        password: hashPassword,
        id_division: id_division,
        id_role: role.id,
      });

      const user = userFindLastInsert;

      res.status(200).json({
        status: "success",
        message: "Successfully register user",
        data: user,
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

      const user = await findDetailUser(emailUsername); //get User from db

      if (!user) {
        throw new Error("User not found");
      }

      const passwordValidate = bcrypt.compareSync(password, user.password);
      if (!passwordValidate) {
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
      const user = await userFindByPK(id);

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
