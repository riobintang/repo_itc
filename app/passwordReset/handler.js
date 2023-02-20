const {
  validateRequestTokenResetPassword,
  validateVerifyOtpToken,
  validateResetPassword,
} = require("../../validator/token");
const resetPasswordServices = require("../../services/mysql/resetPasswordService");

module.exports = {
  //handler for request link reset password
  requestTokenResetPasswordHandler: async (req, res, next) => {
    try {
      const { email } = req.body;
      validateRequestTokenResetPassword({ email });
      //get user by email from db
      const token = await resetPasswordServices.getTokenReset(email);
      res.status(201).json({
        status: "success",
        message: "email sent successfully",
        data: { token: token.token },
      });
    } catch (error) {
      next(error);
    }
  },
  verifyOTPHandler: async (req, res, next) => {
    try{
      const { token, otp } = req.body;
      validateVerifyOtpToken({ token, otp });
      
      res.status(200).json({
        status: 'success',
        message: "OTP is valid"
      })
    } catch (error) {
      next(error);
    }
  },
  //handler for reset password
  resetPasswordHandler: async (req, res, next) => {
    try {
      const { id_user, token } = req.params;
      const { password } = req.body;
      validateResetPassword(password);
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
