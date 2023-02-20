const express = require("express");
const { resetPasswordHandler, requestTokenResetPasswordHandler } = require("./handler");
const router = express.Router();

//API request link for reset password: POST /reset-password/
router.post('/send-code', requestTokenResetPasswordHandler);
//
router.post('/verify', );
//API reset password: POST/reset-password/:id_user/:token
router.post('/reset', resetPasswordHandler);

module.exports = router;