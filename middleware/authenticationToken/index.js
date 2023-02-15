const jwt = require("jsonwebtoken");
const accessTokenSecretKey = "testing-secret-repo-itc";

function authenticationToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        next(new Error("Token not found"));
    }
    
    const token = authHeader.split(" ")[1];
    if (!token) {
        next(new Error("Token is required"));
    }

    const decoded = jwt.verify(token, accessTokenSecretKey);
    const user = {
        id: decoded.id,
    };
    req.user = user;

    next();
}

module.exports = authenticationToken;