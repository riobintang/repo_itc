const express = require("express");
const { handlerPostDiscussion } = require("./handler");
const loginAdmin = require('../../middleware/loginAdmin');
const authenticationToken = require("../../middleware/authenticationToken");
const router = express.Router();

// Post for Discussion
router.post("/:id_course/discussion", authenticationToken, handlerPostDiscussion);

module.exports = router;