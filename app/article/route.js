const express = require("express");
const { handlerGetAllArticleTitleByChapterCourseID, handlerPostArticle, handlerGetArticleById, handlerPutArticle, handlerPostImage, handlerDeleteArticle } = require("./handler");
const loginAdmin = require('../../middleware/loginAdmin');
const upload = require("../../utils/multer");
const authenticationToken = require("../../middleware/authenticationToken");
const router = express.Router();

// Get all Article 
router.get("/:id_course/chapter/:id_chapter/article", authenticationToken, handlerGetAllArticleTitleByChapterCourseID);
// Get Article by id
router.get("/:id_course/chapter/:id_chapter/article/:id_article", authenticationToken, handlerGetArticleById);
// Post for Content and Title Article
router.post("/:id_course/chapter/:id_chapter/article", authenticationToken, loginAdmin, handlerPostArticle);
// Post for image 
router.post("/:id_course/chapter/:id_chapter/article/image", authenticationToken, loginAdmin, upload.single("image"), handlerPostImage);
// Put for Content and Title Article
router.put("/:id_course/chapter/:id_chapter/article/:id_article", authenticationToken, loginAdmin, handlerPutArticle);
// Delete Article
router.delete("/:id_course/chapter/:id_chapter/article/:id_article", authenticationToken, loginAdmin, handlerDeleteArticle);


module.exports = router;