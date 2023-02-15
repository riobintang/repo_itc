const usersServices = require("../../services/mysql/userService");

function loginAdmin(req, res, next) {
  
  if (req.user.role.toLowerCase() === "admin") {
    return next();
  }
  res.status(403).json({
    status: "error",
    message: "You are not admin",
  });
}

module.exports = loginAdmin;