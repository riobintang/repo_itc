const jwt = require("jsonwebtoken");

const accessTokenSecretKey = "testing-secret-repo-itc";

function generateAccessToken(userPayload) {
    return jwt.sign(userPayload, accessTokenSecretKey, {
        expiresIn: "5m",
    });
}

module.exports = generateAccessToken;