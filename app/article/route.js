const express = require("express");
const { handlerGetAllArticleTitleByChapterCourseID, handlerPostArticle, handlerGetArticleById } = require("./handler");
const router = express.Router();

router.get("/:id_course/chapter/:id_chapter/article", handlerGetAllArticleTitleByChapterCourseID);
router.get("/:id_course/chapter/:id_chapter/article/:id_article", handlerGetArticleById);
router.post("/:id_course/chapter/:id_chapter/article", handlerPostArticle);

module.exports = router;