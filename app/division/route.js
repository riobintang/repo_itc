const express = require("express");
const { handlerGetDivision } = require("./handler");
const router = express.Router();

router.get("/", handlerGetDivision);

module.exports = router;