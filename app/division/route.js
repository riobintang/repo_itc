const express = require("express");
const { handlerGetDivision } = require("./handler");
const router = express.Router();

//API get division: GET /division/
router.get("/", handlerGetDivision);

module.exports = router;