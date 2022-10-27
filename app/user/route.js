const express = require("express");
const { handlerRegisterUser } = require("./handler");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("respond send with resource");
});

router.post("/register", handlerRegisterUser);

module.exports = router;
