const express = require("express");
const { handlerGetDivision, handlerGetDivisionById } = require("./handler");
const router = express.Router();

//API get division: GET /division/
router.get("/", handlerGetDivision);
//API get division by id: GET /division/:id
router.get("/:id", handlerGetDivisionById);

module.exports = router;