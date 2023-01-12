const express = require("express");
const { handlerPostComment } = require("./handler");
const loginAdmin = require('../../middleware/loginAdmin');
const authenticationToken = require("../../middleware/authenticationToken");
const router = express.Router();

// Post for Comment
router.post("/:id_course/discussion/:id_discussion/comment", authenticationToken, handlerPostComment);

module.exports = router;