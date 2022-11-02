const express = require("express");
const { handlerRegisterUser, handlerUserLogin, handlerGetUserById } = require("./handler");
const router = express.Router();

//API Register user: POST user/register
router.post("/register", handlerRegisterUser);
//API User Login: POST user/login
router.post("/login", handlerUserLogin);
//API Get User by id: GET user/:id
router.get("/:id", handlerGetUserById);

module.exports = router;
