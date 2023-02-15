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
    token: crypto.randomBytes(32).toString("hex"),
  }).save();
  //make a link for reset password
  const link = `${process.env.BASE_URL}/password-reset/${userReset.id}/${token.token}`;
  await sendEmailResetPassword(email, "Password reset", link, userReset); //sent link to email
  return userReset;
}

async function resetPassword(user) {
  try {
    const reqUser = await User.findOne({
      where: {
        id: user.id_user,
      },
    });
    //checking token in db
    const reqToken = await Token.findOne({
      where: {
        id_user: user.id_user,
        token: user.token,
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
}

module.exports = resetPasswordServices;