const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const randtoken = require("rand-token");
const generateAccessToken = require("../../utils/tokenManager");
const { User, Role } = require("../../models");
const {
  uploadImage,
  deleteImage,
} = require("../../utils/cloudinary/imageServiceCloudinary");
const refreshTokens = {};

async function getUser(id) {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
  });
  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

async function registerUser(user) {
  const errorStack = [];
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
    //throw new Error(`Email address already in use`);
    errorStack.push("Email address already in use");
  }
  if (checkUsername) {
    //throw new Error(`Username already in use`);
    errorStack.push(`Username already in use`);
  }
  if (errorStack.length > 0) {
    throw new Error(errorStack);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const role = await Role.findOne({
    where: {
      roleName: "User",
    },
  });

  await User.create({
    username: username,
    fullName: fullName,
    email: email,
    password: hashPassword,
    id_division: id_division,
    id_role: role.id,
  });
  return {
    username: username,
    fullName: fullName,
    email: email,
    id_division: id_division,
    id_role: role.id,
  };
}

async function userLogin(user) {
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
    include: [{ model: Role }, { model: Division }],
  });

  if (!user) {
    throw new Error("User not found");
  }

  const passwordValidate = bcrypt.compareSync(password, user.password);
  if (!passwordValidate) {
    //validate password
    throw new Error("Invalid password");
  }
  if (user.verify === null) {
    throw new Error(
      "Your account not verified. Please wait for Admin to verify it first."
    );
  }
  const accessToken = generateAccessToken({
    id: user.id,
  });

  const refreshToken = randtoken.uid(256);
  refreshTokens[refreshToken] = user.username;
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
    const user = await User.findOne({
      where: {
        username: user.username,
      },
    });
    const accessToken = generateAccessToken({
      id: user.id,
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

async function putVerifyUser(user) {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("User not found");
  }

  await user.update({ verify });
  if (verify) {
    await sendEmailVerify(user);
  }

  return user;
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
        email: username.email,
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

async function putUserRole(user) {
  const user = await User.findByPk(user.id);
  if (!user) {
    throw new Error("User not found");
  }

  await user.update({ id_role: user.id_role });
  return user;
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
