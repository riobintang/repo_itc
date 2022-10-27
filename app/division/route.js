const express = require("express");
const { handlerGetDivision } = require("./handler");
const router = express.Router();

router.get("/division", handlerGetDivision);

module.exports = router;