const express = require("express");
const { handlerRegisterUser, handlerGetDivision } = require("./handler");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("respond send with resource");
});

router.get("/division", handlerGetDivision);
router.post("/register", handlerRegisterUser);

module.exports = router;
