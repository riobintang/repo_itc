const {
  validateRequestTokenResetPassword,
  validateVerifyOtp,
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
      const token = await resetPasswordServices.getOtp(email);
      res.status(201).json({
        status: "success",
        message: "email sent successfully",
        data: token,
      });
    } catch (error) {
      next(error);
    }
  },
  verifyOTPHandler: async (req, res, next) => {
    try {
      const { otp } = req.body;
      validateVerifyOtp({ otp });

      const unique_token = await resetPasswordServices.verifyOtp(otp);
      res.status(200).json({
        status: "success",
        message: "Successfully verify OTP",
        data: unique_token,
      });
    } catch (error) {
      next(error);
    }
  },
  //handler for reset password
  resetPasswordHandler: async (req, res, next) => {
    try {
      const { unique_token, password, confirmPassword } = req.body;
      validateResetPassword({ unique_token, password, confirmPassword });
      //get user by id from db
      const resetPassword = await resetPasswordServices.resetPassword(
        unique_token,
        password,
        confirmPassword
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
