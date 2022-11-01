const express = require("express");
const { resetPasswordHandler, requestTokenResetPasswordHandler } = require("./handler");
const router = express.Router();

router.post('./', requestTokenResetPasswordHandler);
router.post('./:id_user/:token', resetPasswordHandler);

module.exports = router;