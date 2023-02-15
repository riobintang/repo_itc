const { Comment, Discussion, User } = require("../../models");
const commentsServices = require("../../services/mysql/commentService");
const { validateCreateCommentSchema } = require("../../validator/comment");

module.exports = {
  // handler post for comment
  handlerPostComment: async (req, res, next) => {
    try {
      const id_user = req.user.id;
      const { body } = req.body;
      const { id_course, id_discussion } = req.params;
      validateCreateCommentSchema({ body });
      const comment = await commentsServices.create(
        { body },
        id_user,
        id_course,
        id_discussion
      );

      res.status(201).json({
        status: "success",
        message: "Successfully post Comment",
        data: comment,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetCommentByDiscussion: async (req, res, next) => {
    try {
      const { id_course, id_discussion } = req.params;

      const comments = await commentsServices.getAll(id_discussion, id_course);
      res.status(200).json({
        status: "success",
        message: "Successfully get Comments by Discussion",
        data: comments,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerPutComment: async (req, res, next) => {
    try {
      const id_user = req.user.id;
      const { body } = req.body;
      const { id_course, id_discussion, id_comment } = req.params;
      validateCreateCommentSchema({ body });
      await commentsServices.update(
        { body },
        id_course,
        id_discussion,
        id_comment,
        id_user
      );

      res.status(201).json({
        status: "success",
        message: "Successfully update Comment",
      });
    } catch (error) {
      next(error);
    }
  },
  handlerDeleteComment: async (req, res, next) => {
    try {
      const { id_course, id_discussion, id_comment } = req.params;
      const user = await usersServices.getUserById(req.user.id);
      await commentsServices.delete(id_course, id_discussion, id_comment, user);
      res.status(200).json({
        status: "success",
        message: "Successfully delete comment",
      });
    } catch (error) {
      next(error);
    }
  },
};
