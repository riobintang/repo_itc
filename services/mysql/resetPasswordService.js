const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { User, Token } = require("../../models");
const { sendEmailResetPassword } = require("../../utils/sendEmail");
const subtractHours = require("../../utils/subtractHours");

async function getTokenReset(email) {
  const userReset = await User.findOne({
    where: {
      email: email,
    },
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
  });
  if (!userReset) {
    throw new Error("User with given email doesn't exist");
  }
  userReset.update({
    otp: crypto.randomInt(99999),
    unique_token: crypto.randomBytes(256),
  });

  //make a link for reset password
  await sendEmailResetPassword(email, userReset.otp, userReset.fullName); //sent link to email
  return userReset.otp;
}

async function verifyOtpToken(otp) {
  const verifyReset = await Token.findOne({
    where: {
      otp,
    },
  });
  if (!verifyReset) {
    throw new Error("Invalid code or expired");
  }

  return verifyReset.unique_token;
}

async function resetPassword(unique_token, password, confirmPassword) {
  try {
    const reqUser = await User.findOne({
      where: {
        unique_token,
      },
    });
    
    if(password !== confirmPassword) {
      throw new Error("Confirm Password is not the same")
    }

    if (!reqUser) {
      throw new Error("Invalid token");
    }
    //const diffTime = subtractHours(1, new Date()); //to substract 1 hour when using the token
    //check token expired or not

      reqUser.update({
        password: hashPassword,
        otp: null,
        unique_token: null,
      });

      return reqUser;
    
  } catch (error) {
    throw new Error(error);
  }
}

const resetPasswordServices = {
  getOtp: getTokenReset,
  resetPassword,
  verifyOtp: verifyOtpToken,
};

module.exports = resetPasswordServices;
