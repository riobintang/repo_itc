const Sequelize = require("sequelize");

const {
  validateRegisterUserSchema,
  validateLoginUserSchema,
  validateUserFilePhotoProfileSchema,
  validateUpdateUserSchema,
  validateChangePasswordUserSchema,
  validateUserUpdateProfilePasswordSchema,
  validateUserVerifySchema,
} = require("../../validator/user");
const refreshTokens = {};
const usersServices = require("../../services/mysql/userService");

module.exports = {
  //handler for register user
  handlerRegisterUser: async (req, res, next) => {
    try {
      const { username, fullName, email, password, id_division } = req.body;
      validateRegisterUserSchema({
        username,
        fullName,
        email,
        password,
        id_division,
      });
      await usersServices.register({
        username,
        fullName,
        email,
        password,
        id_division,
      });
      res.status(200).json({
        status: "success",
        message: "Successfully register User",
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
      const user = await usersServices.login(emailUsername, password);

      res.status(200).json({
        status: "success",
        data: {
          user: {
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  },
  //handler for get all users
  handlerGetAllUsers: async (req, res, next) => {
    try {
      const users = await usersServices.getAllUsers();
      res.status(200).json({
        status: "success",
        message: "Successfully get all users",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },
  //handler for get user by id
  handlerGetUserById: async (req, res, next) => {
    try {
      const { id } = req.user;
      const user = await usersServices.getUserById(id);
      res.status(200).json({
        status: "success",
        message: "Successfully get User",
        data: {
          id: user.id,
          username: user.username,
          fullName: user.fullName,
          email: user.email,
          generation: user.generation,
          phoneNumber: user.phoneNumber,
          photoProfile: user.photoProfile,
          createdAt: user.createdAt,
          verify: user.verify,
          id_role: user.id_role,
          divisionName: user.Division.divisionName,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  // handler for refresh token
  refreshJWTHandler: async (req, res, next) => {
    const { refreshToken } = req.body;

    const accessToken = await usersServices.refreshJWT(refreshToken);

    if (accessToken) {
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
  },
  handlerPutUserProfile: async (req, res, next) => {
    try {
      const { fullName, generation, phoneNumber, id_division } = req.body;
      validateUpdateUserSchema({
        fullName,
        generation,
        phoneNumber,
        id_division,
      });
      if (req.file) {
        validateUserFilePhotoProfileSchema(req.file);
      }
      await usersServices.updateUserProfile({
        fullName,
        generation,
        phoneNumber,
        id_division,
        id: req.user.id,
        image: req.file.path,
      });

      res.status(201).json({
        status: "success",
        message: "Successfully update User",
      });
    } catch (error) {
      next(error);
    }
  },
  handlerChangePassword: async (req, res, next) => {
    try {
      const { password } = req.body;

      validateChangePasswordUserSchema({ password });

      await usersServices.updateUserPassword({ password, id: req.user.id });

      res.status(201).json({
        status: "success",
        message: "Successfully change password User",
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetAllUserNotVerify: async (req, res, next) => {
    try {
      const users = await usersServices.getAllUserNulLVerify();

      res.status(200).json({
        status: "success",
        message: "Successfully get All User Not Verify",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerPutVerifyUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { verify } = req.body;
      validateUserVerifySchema({ verify });
      await usersServices.updateUserVerify(id, verify);
      res.status(201).json({
        status: "success",
        message: "Successfully update User",
      });
    } catch (error) {
      next(error);
    }
  },
  handlerPutUserProfilePassword: async (req, res, next) => {
    try {
      const {
        username,
        fullName,
        phoneNumber,
        id_division,
        generation,
        password,
        email,
      } = req.body;
      validateUserUpdateProfilePasswordSchema({
        username,
        fullName,
        phoneNumber,
        id_division,
        generation,
        password,
        email,
      });
      if (req.file) {
        validateUserFilePhotoProfileSchema(req.file);
      }
      await usersServices.updateUserProfileAndPassword({
        username,
        fullName,
        phoneNumber,
        id_division,
        generation,
        password,
        email,
        image: req.file.path,
      });
      res.status(201).json({
        status: "success",
        message: "Successfully update User",
      });
    } catch (error) {
      next(error);
    }
  },
  handlerPutUserRole: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { id_role } = req.body;

      await usersServices.updateRoleUser(id, id_role);
      res.status(201).json({
        status: "success",
        message: "Successfully update User Role",
      });
    } catch (error) {
      next(error);
    }
  },
  handlerDeleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      await usersServices.deleteUser(id);
      res.status(200).json({
        status: "success",
        message: "Successfully delete User",
      });
    } catch (error) {
      next(error);
    }
  },
};
