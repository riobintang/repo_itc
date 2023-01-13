const { Discussion, Course, User } = require("../../models");
const {
  validateCreateDiscussionSchema,
} = require("../../validator/discussion");

module.exports = {
  // handler post for discussion
  handlerPostDiscussion: async (req, res, next) => {
    try {
      const id_user = req.user.id;
      const { title, body } = req.body;
      const { id_course } = req.params;
      validateCreateDiscussionSchema({ title, body });
      const course = await Course.findOne({
        where: {
          id: id_course,
        },
      });
      if (!course) {
        throw new Error("Course not found");
      }
      const discussion = await Discussion.create({
        title,
        body,
        isEdited: false,
        id_course,
        id_user,
      });

      res.status(201).json({
        status: "success",
        message: "Successfully post Discussion",
        data: discussion,
      });
    } catch (error) {
      next(error);
    }
  },
  // handler get all discussion by id course
  handlerGetDiscussionByIdCourse: async (req, res, next) => {
    try {
      const { id_course } = req.params;
      const discussion = await Discussion.findAll({
        where: {
          id_course,
        },
      });
      res.status(200).json({
        status: "success",
        message: "Successfully get Discussion by Course",
        data: discussion,
      });
    } catch (error) {
      next(error);
    }
  },
  // handler get all discussion by id
  handlerGetDiscussionById: async (req, res, next) => {
    try {
      const { id_discussion } = req.params;
      const discussion = await Discussion.findByPk(id_discussion);
      if (!discussion) {
        throw new Error("Discussion not found");
      }

      res.status(200).json({
        status: "success",
        message: "Successfully get Discussion by id",
        data: discussion,
      });
    } catch (error) {
      next(error);
    }
  },
  // handler update discussion
  handlerPutDiscussion: async (req, res, next) => {
    try {
      const id_user = req.user.id;
      const { id_course, id_discussion } = req.params;
      const { title, body } = req.body;
      const discussion = await Discussion.findOne({
        where: {
          id: id_discussion,
          id_course,
        },
      });
      if (!discussion) {
        throw new Error("Discussion not found");
      }
      if (discussion.id_user !== id_user) {
        throw new Error("You are not allowed to edit this discussion");
      }
      validateCreateDiscussionSchema({ title, body });
      await discussion.update({
        title,
        body,
        isEdited: true,
      });
      res.status(201).json({
        status: "success",
        message: "Successfully update Discussion",
        data: discussion,
      });
    } catch (error) {
      next(error);
    }
  },
  // handler delete discussion
  handlerDeleteDiscussion: async (req, res, next) => {
    try {
      const user = req.user;
      const { id_discussion } = req.params;
      const discussion = await Discussion.findByPk(id_discussion);
      if (!discussion) {
        throw new Error("Discussion not found");
      }
      if (discussion.id_user !== user.id && user.role != "admin") {
        throw new Error("You are not allowed to delete this discussion");
      }
      await discussion.destroy();
      res.status(200).json({
        status: "success",
        message: "Successfully delete Discussion",
      });
    } catch (error) {
      next(error);
    }
  },
};
