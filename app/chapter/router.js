const express = require('express');
const authenticationToken = require('../../middleware/authenticationToken');
const { handlerGetAllChaptersByCourseID, handlerPostChapter } = require('./handler');
const router = express.Router();


router.get("/:id_course/chapter", authenticationToken, handlerGetAllChaptersByCourseID);
router.post("/:id_course/chapter", authenticationToken, handlerPostChapter);
module.exports = router;