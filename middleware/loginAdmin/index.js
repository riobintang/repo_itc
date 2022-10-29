
function loginAdmin(req, res, next) {
    console.log(req.body);

    next();
}

module.exports = loginAdmin;