
function loginAdmin(req, res, next) {
    console.log(req.body);
    if (req.user.role.toLowerCase() !== "admin") {
        res.status(403).json({
          status: "error",
          message: "You are not admin",
        });
    }
    next();
}

module.exports = loginAdmin;