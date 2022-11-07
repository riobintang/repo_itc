const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const { User, Role, Division } = require("../../models");
const jwt = require("jsonwebtoken");
const accessTokenSecretKey = "testing-secret-repo-itc";
const randtoken = require("rand-token");
const refreshTokens = {};

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
      //check unique username and email
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
        throw new Error(`Email address already in use`);
      }
      if (checkUsername) {
        throw new Error(`Username already in use`);
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const role = await Role.findOne({
        where: {
          roleName: "User",
        },
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
        include: [{ model: Role }, { model: Division }],
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
        id_role: user.id_role,
        division: user.Division.divisionName,
        id_division: user.id_division,
      });

      const refreshToken = randtoken.uid(256);
      refreshTokens[refreshToken] = user.username;

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
            refreshToken,
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
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
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
  // handler for refresh token
  refreshJWTHandler: async (req, res, next) => {
    const username = req.body.username;
    const refreshToken = req.body.refreshToken;

    if ((refreshToken in refreshTokens) && (refreshTokens[refreshToken] == username)) {
      const authHeader = req.headers["authorization"];
      if (!authHeader) {
          next(new Error("Token not found"));
      }
      
      const token = authHeader.split(" ")[1];
      if (!token) {
          next(new Error("Token is required"));
      }
      
      const decoded = jwt.verify(token, accessTokenSecretKey);
      const user = {
          id: decoded.id,
          email: decoded.email,
          username: decoded.username,
          role: decoded.role,
          id_role: decoded.id_role,
          division: decoded.division,
          id_division: decoded.id_division,
      };
      const accessToken = generateAccessToken(user);
      res.status(200).json({
        status: "success",
        message: "Successfully refresh access token",
        data: {
          accessToken,
        },
      });
    } else {
      res.status(403).json({
        status: "error",
        message: "Invalid refresh token",
      });
    }
  }
};