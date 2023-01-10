const express = require("express");
const { handlerGetAllArticleTitleByChapterCourseID, handlerPostArticle, handlerGetArticleById, handlerPutArticle, handlerPostImage } = require("./handler");
const loginAdmin = require('../../middleware/loginAdmin');
const upload = require("../../utils/multer");
const router = express.Router();

router.get("/:id_course/chapter/:id_chapter/article", handlerGetAllArticleTitleByChapterCourseID);

router.get("/:id_course/chapter/:id_chapter/article/:id_article", handlerGetArticleById);

router.post("/:id_course/chapter/:id_chapter/article", loginAdmin, handlerPostArticle);

router.post("/:id_course/chapter/:id_chapter/article/image", loginAdmin, upload.single("image"), handlerPostImage);

router.put("/:id_course/chapter/:id_chapter/article/:id_article", loginAdmin, handlerPutArticle);


module.exports = router;