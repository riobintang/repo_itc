const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { User, Token } = require("../../models");
const sendEmail = require("../../utils/sendEmail");
const subtractHours = require("../../utils/subtractHours");
const validateRequestTokenResetPassword = require("../../validator/token");

module.exports = {
  requestTokenResetPasswordHandler: async (req, res, next) => {
    try {
      const { email } = req.body;
      validateRequestTokenResetPassword(req.body);
      const userReset = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!userReset) {
        throw new Error("User with given email doesn't exist");
      }

      const token = await new Token({
        id_user: userReset.id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();

      const link = `${process.env.BASE_URL}/password-reset/${userReset.id}/${token.token}`;
      await sendEmail(userReset.email, "Password reset", link);
      res.status(201).json({
        status: "success",
        message: "email sent successfully",
        data: link, //hapus link
      });
    } catch (error) {
      next(error);
    }
  },
  resetPasswordHandler: async (req, res, next) => {
    try {
      const { id_user, token } = req.params;
      const { password } = req.body;

      const reqUser = await User.findOne({
        where: {
          id: id_user,
        },
      });

      const reqToken = await Token.findOne({
        where: {
          id_user: id_user,
          token: token,
        },
      });

      if (!reqUser || !reqToken) {
        throw new Error("Invalid link or expired");
      }
      const diffTime = subtractHours(1, new Date());

      if (reqToken.createdAt >= diffTime) {
        const hashPassword = await bcrypt.hash(password, 10);
        reqUser.set({
          password: hashPassword,
        });
        await reqUser.save();
        await reqToken.destroy();
        res.status(201).json({
          status: "success",
          message: "Password reset successfully",
        });
      } else {
        throw new Error("Invalid link or expired");
      }
    } catch (error) {
      next(error);
    }
  },
};
