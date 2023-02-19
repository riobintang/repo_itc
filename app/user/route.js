const express = require("express");
const authenticationToken = require("../../middleware/authenticationToken");
const { handlerRegisterUser, handlerUserLogin, handlerGetAllUsers, handlerGetUserById, refreshJWTHandler, handlerPutUserProfile, handlerChangePassword, handlerPutUserProfilePassword, handlerPutVerifyUser, handlerPutUserRole, handlerDeleteUser } = require("./handler");
const upload = require("../../utils/multer");
const loginAdmin = require("../../middleware/loginAdmin");
const router = express.Router();

//API Register user: POST users/register
router.post("/register", handlerRegisterUser);
//API User Login: POST users/login
router.post("/login", handlerUserLogin);
//API Get All Users: GET /users
router.get("/", authenticationToken, loginAdmin, handlerGetAllUsers);
//API Get User profile: GET users/profile
router.get("/profile", authenticationToken, handlerGetUserById);
//API Refresh Token: POST users/refresh
router.post("/refresh-token", refreshJWTHandler);
// API Update User Profile: PUT users/update/:id
router.put("/update", authenticationToken, upload.single("image"), handlerPutUserProfile);
// API User Change Password: POST users/changepassword/:id
router.post("/changepassword", authenticationToken, handlerChangePassword);
// API Update User Profile and Password: PUT user/updateprofilepassword/:id
router.put("/updateprofilepassword", authenticationToken, upload.single("image"), handlerPutUserProfilePassword);
// API Verify User: Put users/verify/:id
router.put("/verify/:id", authenticationToken, loginAdmin, handlerPutVerifyUser);
// API Update User Role: PUT users/role/:id
router.put("/role/:id", authenticationToken, loginAdmin, handlerPutUserRole);
// API Delete User: DELETE users/:id
router.delete("/:id", authenticationToken, loginAdmin, handlerDeleteUser);
module.exports = router;
