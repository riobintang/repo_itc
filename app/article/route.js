const express = require("express");
const { handlerGetAllArticleTitleByChapterCourseID } = require("./handler");
const router = express.Router();

router.get("/:id_course/chapter/:id_chapter/article", handlerGetAllArticleTitleByChapterCourseID);


module.exports = router;