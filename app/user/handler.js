const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const { User, Role, Division, sequelize } = require("../../models");
const jwt = require("jsonwebtoken");
const accessTokenSecretKey = "testing-secret-repo-itc";
const randtoken = require("rand-token");
const refreshTokens = {};

const generateAccessToken = require("../../utils/tokenManager");
const {
  validateRegisterUserSchema,
  validateLoginUserSchema,
  validateUserFilePhotoProfileSchema,
  validateUpdateUserSchema,
  validateChangePasswordUserSchema,
  validateUserUpdateProfilePasswordSchema,
} = require("../../validator/user");
const {
  uploadImage,
  deleteImage,
} = require("../../utils/cloudinary/imageServiceCloudinary");

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

    if (
      refreshToken in refreshTokens &&
      refreshTokens[refreshToken] == username
    ) {
      const user = await User.findOne({
        where: {
          username: username,
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [{ model: Role }, { model: Division }],
      });
      const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.Role.roleName,
        id_role: user.id_role,
        division: user.Division.divisionName,
        id_division: user.id_division,
      });
      //const accessToken = generateAccessToken(user);
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
    const t = await sequelize.transaction();
    let image_id;
    let photoProfile;
    try {
      const { fullName, generation, phoneNumber, id_division } = req.body;
      const user = req.user;
      const { id } = req.params;

      if (user.id != id) {
        throw new Error("You are not allowed to edit");
      }
      const updateUser = await User.findByPk(id);
      if (!updateUser) {
        throw new Error("User not found");
      }

      validateUpdateUserSchema({
        fullName,
        generation,
        phoneNumber,
        id_division,
      });

      await updateUser.update(
        {
          fullName,
          generation,
          phoneNumber,
          id_division,
        },
        { transaction: t }
      );

      if (req.file) {
        validateUserFilePhotoProfileSchema(req.file);
        if (updateUser.photoProfile) {
          const photo_id = updateUser.photoProfile.split("/user/").pop().split(".")[0];
          // const deleteimg = await deleteImage("user", photo_id);
          // console.log(deleteimg);
          photoProfile = await uploadImage(req.file.path, "user", photo_id)
          console.log("timpa")
        } else {
          photoProfile = await uploadImage(req.file.path, "user");
          console.log("baru")
        }
        await updateUser.update(
          { photoProfile: photoProfile.secure_url },
          { transaction: t }
        );
        image_id = photoProfile.public_id.split("/")[2];
      }

      await t.commit();
      res.status(201).json({
        status: "success",
        message: "Successfully update User",
      });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  },
  handlerChangePassword: async (req, res, next) => {
    try {
      const { password } = req.body;
      const { id } = req.params;
      const user = req.user;

      if (user.id != id) {
        throw new Error("You are not allowed to edit");
      }

      validateChangePasswordUserSchema({ password });

      const hashPassword = await bcrypt.hash(password, 10);
      const updateUser = await User.findByPk(id);

      if (!updateUser) {
        throw new Error("User not found");
      }

      await updateUser.update({ password: hashPassword });

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
      const users = await User.findAll({
        where: {
          verify: false,
        },
      });

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
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }

      if (user.verify) {
        throw new Error("User has been verified");
      }

      await user.update({ verify: true });
      res.status(201).json({
        status: "success",
        message: "Successfully verify User",
      });
    } catch (error) {
      next(error);
    }
  },
  handlerPutUserProfilePassword: async (req, res, next) => {
    const t = await sequelize.transaction();
    let image_id;
    try {
      const { fullName, generation, phoneNumber, id_division, password, username, email } =
        req.body;
      const user = req.user;
      const { id } = req.params;

      if (user.id != id) {
        throw new Error("You are not allowed to edit");
      }
      const updateUser = await User.findByPk(id);
      if (!updateUser) {
        throw new Error("User not found");
      }
      validateUserUpdateProfilePasswordSchema({fullName, generation, password, phoneNumber, id_division, username, email})

      const hashPassword = await bcrypt.hash(password, 10);
      const checkUsername = await User.findOne({
        where:{
          username,
          id: {[Op.ne]: id},
        }
      });
      if (checkUsername) {
        throw new Error("Username has been used");
      }
      const checkEmail = await User.findOne({
        where:{
          email,
          id: {[Op.ne]: id},
        }
      });

      if (checkEmail) {
        throw new Error("Email has been used");
      }
      await updateUser.update(
        {
          fullName,
          generation,
          phoneNumber,
          id_division,
          password: hashPassword,
        },
        { transaction: t }
      );

      if (req.file) {
        validateUserFilePhotoProfileSchema(req.file);
        if (updateUser.photoProfile) {
          const photo_id = updateUser.photoProfile.split("/user/").pop().split(".")[0];
          photoProfile = await uploadImage(req.file.path, "user", photo_id)
          console.log("timpa")
        } else {
          photoProfile = await uploadImage(req.file.path, "user");
          console.log("baru")
        }
        await updateUser.update(
          { photoProfile: photoProfile.secure_url },
          { transaction: t }
        );
        image_id = photoProfile.public_id.split("/")[2];
      }
      await t.commit();
      res.status(201).json({
        status: "success",
        message: "Successfully update User",
      });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  },
};
