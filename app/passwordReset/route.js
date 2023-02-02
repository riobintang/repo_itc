const express = require("express");
const { resetPasswordHandler, requestTokenResetPasswordHandler } = require("./handler");
const router = express.Router();

//API request link for reset password: POST /reset-password/
router.post('/', requestTokenResetPasswordHandler);
//API reset password: POST /reset-password/:id_user/:token
router.put('/:id_user/:token', resetPasswordHandler);

module.exports = router;