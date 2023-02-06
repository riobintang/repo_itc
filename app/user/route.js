const express = require("express");
const authenticationToken = require("../../middleware/authenticationToken");
const { handlerRegisterUser, handlerUserLogin, handlerGetUserById, refreshJWTHandler, handlerPutUserProfile, handlerChangePassword, handlerPutUserProfilePassword, handlerPutVerifyUser } = require("./handler");
const upload = require("../../utils/multer");
const loginAdmin = require("../../middleware/loginAdmin");
const router = express.Router();

//API Register user: POST user/register
router.post("/register", handlerRegisterUser);
//API User Login: POST user/login
router.post("/login", handlerUserLogin);
//API Get User by id: GET user/:id
router.get("/:id", authenticationToken, handlerGetUserById);
//API Refresh Token: POST user/refresh
router.post("/refresh-token", refreshJWTHandler);
// API Update User Profile: PUT user/update/:id
router.put("/update/:id", authenticationToken, upload.single("image"), handlerPutUserProfile);
// API User Change Password: POST user/changepassword/:id
router.post("/changepassword/:id", authenticationToken, handlerChangePassword);
// API Update User Profile and Password: PUT user/updateprofilepassword/:id
router.put("/updateprofilepassword/:id", authenticationToken, upload.single("image"), handlerPutUserProfilePassword);
// API Verify User: Put user/verify/:id
router.put("/verify/:id", authenticationToken, loginAdmin, handlerPutVerifyUser);
module.exports = router;
