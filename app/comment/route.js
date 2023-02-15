const express = require("express");
const { handlerPostComment, handlerGetCommentByDiscussion, handlerPutComment, handlerDeleteComment } = require("./handler");
const loginAdmin = require('../../middleware/loginAdmin');
const authenticationToken = require("../../middleware/authenticationToken");
const router = express.Router();

// Get for Comment 
router.get("/:id_course/discussions/:id_discussion/comments", authenticationToken, handlerGetCommentByDiscussion);
// Post for Comment
router.post("/:id_course/discussions/:id_discussion/comments", authenticationToken, handlerPostComment);
// Put for Comment
router.put("/:id_course/discussions/:id_discussion/comments/:id_comment", authenticationToken, handlerPutComment);
// Delete for Comment
router.delete("/:id_course/discussions/:id_discussion/comments/:id_comment", authenticationToken, handlerDeleteComment);


module.exports = router;