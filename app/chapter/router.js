const express = require('express');
const authenticationToken = require('../../middleware/authenticationToken');
const loginAdmin = require('../../middleware/loginAdmin');
const { handlerGetAllChaptersByCourseID, handlerGetChapterAndArticle, handlerPostChapter, handlerPutChapter, handlerDeleteChapter } = require('./handler');
const router = express.Router();

//API get all chapters from specific course: GET /course/:id_course/chapter
router.get("/:id_course/chapters", authenticationToken, handlerGetAllChaptersByCourseID);
//API get chapters and artile title: GET /course/:id_course/chapter/article
router.get("/:id_course/chapters/articles", authenticationToken, handlerGetChapterAndArticle);
//API post chapter from specific course: POST /course/:id_course/chapter
router.post("/:id_course/chapters", authenticationToken, loginAdmin, handlerPostChapter);
//API put chapter from specific course: PUT /course/:id_course/chapter/:id_chapter
router.put("/:id_course/chapters/:id_chapter", authenticationToken, loginAdmin, handlerPutChapter);
//API delete chapter from specific course: DELETE /course/:id_course/chapter/:id_chapter
router.delete("/:id_course/chapters/:id_chapter", authenticationToken, loginAdmin, handlerDeleteChapter);

module.exports = router;