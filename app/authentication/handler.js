const cookierParser = require("cookie-parser");
const generateAccessToken = require("../../utils/tokenManager");
const accessTokenSecretKey = "testing-secret-repo-itc";

module.exports = {
  refreshJWTHandler: async (req, res, next) => {
    if (req.cookies?.jwt) {
      const refreshToken = req.cookies.jwt;
      jwt.verify(refreshToken, accessTokenSecretKey, (err, decoded) => {
        if (err) {
          res.status(406).json({
            status: "failed",
            message: "Unauthorized",
          });
        } else {
            const user = {
                id: decoded.id,
                email: decoded.email,
                username: decoded.username,
                role: decoded.role,
            };
            const accessToken = generateAccessToken(user);
            res.json({accessToken});
        }
      });
    }
  },
};
