const express = require("express");
const { handlerRegisterUser, handlerUserLogin, handlerGetUserById } = require("./handler");
const router = express.Router();

//API Register user: user/register
router.post("/register", handlerRegisterUser);
//API User Login: user/login
router.post("/login", handlerUserLogin);
//API Get User by id: user/:id
router.get("/:id", handlerGetUserById);

module.exports = router;
