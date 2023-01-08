const express = require("express");
const { handlerGetAllArticleTitleByChapterCourseID, handlerPostArticle, handlerGetArticleById } = require("./handler");
const upload = require("../../utils/multer");
const router = express.Router();

router.get("/:id_course/chapter/:id_chapter/article", handlerGetAllArticleTitleByChapterCourseID);

router.get("/:id_course/chapter/:id_chapter/article/:id_article", handlerGetArticleById);

router.post("/:id_course/chapter/:id_chapter/article", loginAdmin, handlerPostArticle);

router.post("/:id_course/chapter/:id_chapter/article", loginAdmin, upload.single("image"), handlerPostArticle);

module.exports = router;