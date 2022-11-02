const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { User, Token } = require("../../models");
const sendEmail = require("../../utils/sendEmail");
const subtractHours = require("../../utils/subtractHours");
const validateRequestTokenResetPassword = require("../../validator/token");

module.exports = {
  //handler for request link reset password
  requestTokenResetPasswordHandler: async (req, res, next) => {
    try {
      const { email } = req.body;
      validateRequestTokenResetPassword(req.body);
      //get user by email from db
      const userReset = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!userReset) {
        throw new Error("User with given email doesn't exist");
      }
      //make a token for reset password
      const token = await new Token({
        id_user: userReset.id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
      //make a link for reset password
      const link = `${process.env.BASE_URL}/password-reset/${userReset.id}/${token.token}`;
      await sendEmail(userReset.email, "Password reset", link, userReset); //sent link to email
      res.status(201).json({
        status: "success",
        message: "email sent successfully",
        data: link, //jangan lupa hapus link 
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
      const reqUser = await User.findOne({
        where: {
          id: id_user,
        },
      });
      //checking token in db
      const reqToken = await Token.findOne({
        where: {
          id_user: id_user,
          token: token,
        },
      });

      if (!reqUser || !reqToken) {
        throw new Error("Invalid link or expired");
      }
      const diffTime = subtractHours(1, new Date()); //to substract 1 hour when using the token
      //check token expired or not
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