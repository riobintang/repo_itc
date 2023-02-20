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
  const token = await new Token({
    id_user: userReset.id,
    otp: crypto.randomInt(99999),
  }).save();
  //make a link for reset password
  await sendEmailResetPassword(email, token.otp, userReset.fullName); //sent link to email
  return token;
}

async function verifyOtpToken(otp, token) {
  const verifyReset = await Token.findOne({
    where: {
      otp, token
    }
  });
  if (!verifyReset) {
    throw new Error("Invalid code or expired");
  }
  if (!verifyReset.valid) {
    throw new Error("Invalid code or expired")
  }

  return verifyReset;
}

async function resetPassword(id_user, token, otp) {
  try {
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
        otp: otp,
      },
    });

    if (!reqUser || !reqToken) {
      throw new Error("Invalid link or expired");
    }
    const diffTime = subtractHours(1, new Date()); //to substract 1 hour when using the token
    //check token expired or not
    if (reqToken.createdAt >= diffTime) {
      const hashPassword = await bcrypt.hash(user.password, 10);
      reqUser.set({
        password: hashPassword,
      });
      
      await reqUser.save();
      await reqToken.destroy();

      return reqUser;
    } else {
      throw new Error("Invalid link or expired");
    }
  } catch (error) {
    throw new Error(error);
  }
}

const resetPasswordServices = {
  getTokenReset,
  resetPassword,
};

module.exports = resetPasswordServices;
