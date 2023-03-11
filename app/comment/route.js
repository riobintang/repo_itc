const express = require("express");
const { handlerPostComment, handlerGetCommentByDiscussion, handlerPutComment, handlerDeleteComment, handlerPostImageComment, handlerDeleteImageComment } = require("./handler");

const authenticationToken = require("../../middleware/authenticationToken");
const router = express.Router();
const upload = require("../../utils/multer");

// Post for Image Discussion
router.post("/image", authenticationToken, upload.single("image"), handlerPostImageComment);
// Delete for Image Discussion
router.delete("/deleteimage", authenticationToken, handlerDeleteImageComment);
// Get for Comment 
router.get("/:id_course/discussions/:id_discussion/comments", authenticationToken, handlerGetCommentByDiscussion);
// Post for Comment
router.post("/:id_course/discussions/:id_discussion/comments", authenticationToken, handlerPostComment);
// Put for Comment
router.put("/:id_course/discussions/:id_discussion/comments/:id_comment", authenticationToken, handlerPutComment);
// Delete for Comment
router.delete("/:id_course/discussions/:id_discussion/comments/:id_comment", authenticationToken, handlerDeleteComment);


module.exports = router;