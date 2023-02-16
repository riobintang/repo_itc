const usersServices = require("../../services/mysql/userService");


async function loginAdmin(req, res, next) {
  const user = await usersServices.getUserById(req.user.id);
  if (user.Role.roleName.toLowerCase() === "admin") {
    return next();
  }
  res.status(403).json({
    status: "error",
    message: "You are not admin",
  });
}

module.exports = loginAdmin;