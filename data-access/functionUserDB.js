const Sequelize = require("sequelize");
const { User, Role, Division } = require("../models");

const Op = Sequelize.Op;

async function checkEmailAndUsername(email, username) {
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
    return {checkEmail, checkUsername};
}

//get user with role and division 
async function findDetailUser(emailUsername) {
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
    include: [{ model: Role }, { model: Division }], //associate with role and division to make user detail
  });

  return user;
}

async function userFindByPK(id) {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
  });
  return user;
}

async function userFindLastInsert() {
  const user = await User.findOne({
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    order: [["createdAt", "DESC"]], //to send last data inserted to database
  });
  return user;
}

module.exports = {
  checkEmailAndUsername,
  findDetailUser,
  userFindByPK,
  userFindLastInsert,
};
