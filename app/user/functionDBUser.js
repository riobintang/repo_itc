const { User } = require("../../models");
async function checkUniqueRegister(email, username, next) {
  try {
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
  } catch (error) {
    next(error);
  }
}

async function checkLogin() {

}

module.exports = { checkUniqueRegister };
