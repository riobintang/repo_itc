const express = require("express");
const { handlerRegisterUser, handlerUserLogin, handlerGetUserById } = require("./handler");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("respond send with resource");
});

router.post("/register", handlerRegisterUser);
router.post("/login", handlerUserLogin);
router.get("/:id", handlerGetUserById);

module.exports = router;
