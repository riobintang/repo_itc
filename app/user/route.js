const express = require("express");
const authenticationToken = require("../../middleware/authenticationToken");
const { handlerRegisterUser, handlerUserLogin, handlerGetUserById, refreshJWTHandler, handlerPutUserProfile } = require("./handler");
const upload = require("../../utils/multer");
const router = express.Router();

//API Register user: POST user/register
router.post("/register", handlerRegisterUser);
//API User Login: POST user/login
router.post("/login", handlerUserLogin);
//API Get User by id: GET user/:id
router.get("/:id", authenticationToken, handlerGetUserById);
//API Refresh Token: POST user/refresh
router.post("/refresh-token", authenticationToken,refreshJWTHandler);

router.put("/update", authenticationToken, upload.single("image"), handlerPutUserProfile);

module.exports = router;
