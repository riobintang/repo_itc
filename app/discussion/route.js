const express = require("express");
const { handlerPostDiscussion, handlerGetDiscussionByIdCourse, handlerGetDiscussionById, handlerDeleteDiscussion, handlerPutDiscussion, handlerGetSearchDiscusssion, handlerPostImage, handlerPostImageDiscussion } = require("./handler");

const authenticationToken = require("../../middleware/authenticationToken");
const router = express.Router();
const upload = require("../../utils/multer");


// Post for Image Discussion
router.post("/image", authenticationToken, upload.single("image"), handlerPostImageDiscussion);
// Post for Discussion
router.post("/:id_course/discussions", authenticationToken, handlerPostDiscussion);
// Get all dicussion by Specific Course
router.get("/:id_course/discussions", authenticationToken, handlerGetDiscussionByIdCourse);
// Get discussion with search
router.get("/:id_course/discussions/search", authenticationToken, handlerGetSearchDiscusssion);
// Get discussion by id discussion
router.get("/:id_course/discussions/:id_discussion", authenticationToken, handlerGetDiscussionById);
// Put for discussion
router.put("/:id_course/discussions/:id_discussion", authenticationToken, handlerPutDiscussion);
// Delete for discussion
router.delete("/:id_course/discussions/:id_discussion", authenticationToken, handlerDeleteDiscussion);
// Delete for Image Discussion
router.delete("/deleteimage", authenticationToken, handlerDeleteDiscussion);
module.exports = router;