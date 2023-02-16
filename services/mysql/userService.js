const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const randtoken = require("rand-token");
const generateAccessToken = require("../../utils/tokenManager");
const { User, Role, Division } = require("../../models");
const {
  uploadImage,
  deleteImage,
} = require("../../utils/cloudinary/imageServiceCloudinary");
const { sendEmailVerify } = require("../../utils/sendEmail.js");
const refreshTokens = {};
const Op = Sequelize.Op;

async function getUser(id) {
  const getUser = await User.findByPk(id, {
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    include: [{ model: Role, attributes: ["roleName"] }, { model: Division, attributes: ["divisionName"] }],
  });
  if (!getUser) {
    throw new Error("User not found");
  }
  console.log(getUser)

  return getUser;
}

async function registerUser(user) {
  //const errorStack = [];
  const checkEmail = await User.findOne({
    where: {
      email: user.email,
    },
  });

  const checkUsername = await User.findOne({
    where: {
      username: user.username,
    },
  });

  if (checkEmail) {
    throw new Error(`Email address already in use`);
    //errorStack.push("Email address already in use");
  }
  if (checkUsername) {
    throw new Error(`Username already in use`);
    //errorStack.push(`Username already in use`);
  }
  // if (errorStack.length > 0) {
  //   throw new Error(errorStack);
  // }

  const hashPassword = await bcrypt.hash(user.password, 10);
  const role = await Role.findOne({
    where: {
      roleName: "User",
    },
  });

  const registerUser = await User.create({
    username: user.username,
    fullName: user.fullName,
    email: user.email,
    password: hashPassword,
    id_division: user.id_division,
    id_role: role.id,
  });
  return {
    id: registerUser.id,
    username: registerUser.username,
    fullName: registerUser.fullName,
    email: registerUser.email,
    id_division: registerUser.id_division,
    id_role: registerUser.id,
  };
}

async function userLogin(emailUsername, password) {
  const userLogin = await User.findOne({
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
    include: [{ model: Role }, { model: Division }],
  });

  if (!userLogin) {
    throw new Error("User not found");
  }

  const passwordValidate = bcrypt.compareSync(password, userLogin.password);
  if (!passwordValidate) {
    //validate password
    throw new Error("Invalid password");
  }
  if (userLogin.verify === null) {
    throw new Error(
      "Your account not verified. Please wait for Admin to verify it first."
    );
  }
  const accessToken = generateAccessToken({
    id: userLogin.id,
  });

  const refreshToken = randtoken.uid(256);
  refreshTokens[refreshToken] = userLogin.username;
  return {
    accessToken,
    refreshToken,
  };
}

async function getAllUsers() {
  const user = await User.findAll({
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
  });
  return user;
}

async function refreshJWT(user) {
  if (
    user.refreshToken in refreshTokens &&
    refreshTokens[user.refreshToken] == user.username
  ) {
    const selectedUser = await User.findOne({
      where: {
        username: user.username,
      },
    });
    const accessToken = generateAccessToken({
      id: selectedUser.id,
    });
    return accessToken;
  }
}

async function putUserProfile(user) {
  const t = await sequelize.transaction();
  let image_id;
  let photoProfile;
  try {
    const updateUser = await User.findByPk(user.id);
    if (!updateUser) {
      throw new Error("User not found");
    }

    await updateUser.update(
      {
        fullName: data.fullName,
        generation: data.generation,
        phoneNumber: data.phoneNumber,
        id_division: data.id_division,
      },
      { transaction: t }
    );

    if (data.image) {
      if (updateUser.photoProfile) {
        const photo_id = updateUser.photoProfile
          .split("/user/")
          .pop()
          .split(".")[0];
        // const deleteimg = await deleteImage("user", photo_id);
        // console.log(deleteimg);
        photoProfile = await uploadImage(data.image, "user", photo_id);
      } else {
        photoProfile = await uploadImage(data.image, "user");
      }
      await updateUser.update(
        { photoProfile: photoProfile.secure_url },
        { transaction: t }
      );
      image_id = photoProfile.public_id.split("/")[2];
    }

    await t.commit();
    return updateUser;
  } catch (error) {
    await t.rollback();
    throw new Error(error);
  }
}

async function changePassword(user) {
  const hashPassword = await bcrypt.hash(user.password, 10);
  const updateUser = await User.findByPk(user.id);

  if (!updateUser) {
    throw new Error("User not found");
  }

  await updateUser.update({ password: hashPassword });

  return updateUser;
}

async function getAllUsersNullVerify() {
  const users = await User.findAll({
    where: {
      verify: null,
    },
  });
  return users;
}

async function putVerifyUser(id, verify) {
  const updateUser = await User.findByPk(id);

  if (!updateUser) {
    throw new Error("User not found");
  }

  await updateUser.update({ verify });
  if (verify) {
    await sendEmailVerify(updateUser);
  }

  return updateUser;
}

async function putUserProfileAndPassword(user) {
  const t = await sequelize.transaction();
  let image_id;
  try {
    const updateUser = await User.findByPk(user.id);
    if (!updateUser) {
      throw new Error("User not found");
    }

    const hashPassword = await bcrypt.hash(user.password, 10);
    const checkUsername = await User.findOne({
      where: {
        username: user.username,
        id: { [Op.ne]: user.id },
      },
    });
    if (checkUsername) {
      throw new Error("Username has been used");
    }
    const checkEmail = await User.findOne({
      where: {
        email: user.email,
        id: { [Op.ne]: user.id },
      },
    });

    if (checkEmail) {
      throw new Error("Email has been used");
    }
    await updateUser.update(
      {
        fullName: user.fullName,
        generation: user.generation,
        phoneNumber: user.phoneNumber,
        id_division: user.id_division,
        password: hashPassword,
      },
      { transaction: t }
    );

    if (data.image) {
      //replace image
      if (updateUser.photoProfile) {
        const photo_id = updateUser.photoProfile
          .split("/user/")
          .pop()
          .split(".")[0];
        photoProfile = await uploadImage(data.image, "user", photo_id);
      } else {
        // for new image
        photoProfile = await uploadImage(data.image, "user");
      }
      await updateUser.update(
        { photoProfile: photoProfile.secure_url },
        { transaction: t }
      );
      image_id = photoProfile.public_id.split("/")[2];
    }

    await t.commit();
    return updateUser;
  } catch (error) {
    await t.rollback();
    throw new Error(error);
  }
}

async function putUserRole(id, id_role) {
  const updateUserRole = await User.findByPk(id);
  if (!updateUserRole) {
    throw new Error("User not found");
  }

  await updateUserRole.update({ id_role: id_role });
  return updateUserRole;
}

async function deleteUser(id) {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }
  await user.destroy();
  return user;
}

const usersServices = {
  getUserById: getUser,
  register: registerUser,
  login: userLogin,
  getAllUsers: getAllUsers,
  refreshJWT: refreshJWT,
  updateUserProfile: putUserProfile,
  updateUserPassword: changePassword,
  updateUserProfileAndPassword: putUserProfileAndPassword,
  updateRoleUser: putUserRole,
  deleteUser: deleteUser,
  getAllUserNulLVerify: getAllUsersNullVerify,
  updateUserVerify: putVerifyUser,
};

module.exports = usersServices;
