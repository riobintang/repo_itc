const express = require("express");
const authenticationToken = require("../../middleware/authenticationToken");
const { handlerRegisterUser, handlerUserLogin, handlerGetUserById, refreshJWTHandler } = require("./handler");
const router = express.Router();

//API Register user: POST user/register
router.post("/register", handlerRegisterUser);
//API User Login: POST user/login
router.post("/login", handlerUserLogin);
//API Get User by id: GET user/:id
router.get("/:id", handlerGetUserById);
//API Refresh Token: POST user/refresh
router.post("/refresh-token", authenticationToken, refreshJWTHandler);

module.exports = router;
