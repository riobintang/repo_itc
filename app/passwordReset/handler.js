const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { User, Token } = require("../../models");
const { sendEmailResetPassword } = require("../../utils/sendEmail");
const subtractHours = require("../../utils/subtractHours");
const validateRequestTokenResetPassword = require("../../validator/token");
const resetPasswordServices = require("../../services/mysql/resetPasswordService");

module.exports = {
  //handler for request link reset password
  requestTokenResetPasswordHandler: async (req, res, next) => {
    try {
      const { email } = req.body;
      validateRequestTokenResetPassword({ email });
      //get user by email from db
      await resetPasswordServices.getTokenReset(email);
      res.status(201).json({
        status: "success",
        message: "email sent successfully",
      });
    } catch (error) {
      next(error);
    }
  },
  //handler for reset password
  resetPasswordHandler: async (req, res, next) => {
    try {
      const { id_user, token } = req.params;
      const { password } = req.body;
      //get user by id from db
      const resetPassword = await resetPasswordServices.resetPassword(
        id_user,
        token
      );

      res.status(201).json({
        status: "success",
        message: "Password reset successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};
