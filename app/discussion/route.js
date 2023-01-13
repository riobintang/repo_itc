const express = require("express");
const { handlerPostDiscussion, handlerGetDiscussionByIdCourse, handlerGetDiscussionById, handlerDeleteDiscussion, handlerPutDiscussion } = require("./handler");
const loginAdmin = require('../../middleware/loginAdmin');
const authenticationToken = require("../../middleware/authenticationToken");
const router = express.Router();

// Post for Discussion
router.post("/:id_course/discussion", authenticationToken, handlerPostDiscussion);
// Get all dicussion by Specific Course
router.get("/:id_course/discussion", authenticationToken, handlerGetDiscussionByIdCourse);
// Get discussion by id discussion
router.get("/:id_course/discussion/:id_discussion", authenticationToken, handlerGetDiscussionById);
// Put for discussion
router.put("/:id_course/discussion/:id_discussion", authenticationToken, handlerPutDiscussion);
// Delete for discussion
router.delete("/:id_course/discussion/:id_discussion", authenticationToken, handlerDeleteDiscussion);

module.exports = router;