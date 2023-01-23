const { Comment, Discussion } = require("../../models");
const { validateCreateCommentSchema } = require("../../validator/comment");

module.exports = {
  // handler post for comment
  handlerPostComment: async (req, res, next) => {
    try {
      const id_user = req.user.id;
      const { body } = req.body;
      const { id_course, id_discussion } = req.params;
      validateCreateCommentSchema({ body });
      const discussion = await Discussion.findOne({
        where: {
          id: id_discussion,
          id_course,
        },
      });
      if (!discussion) {
        throw new Error("Discussion not found");
      }
      const comment = await Comment.create({
        body,
        isEdited: false,
        id_discussion,
        id_user,
      });

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

      const discussion = await Discussion.findOne({
        where: {
          id: id_discussion,
          id_course,
        },
      });
      if (!discussion) {
        throw new Error("Discussion not found");
      }

      const comment = await Comment.findAll({
        where: {
          id_discussion,
        },
      });
      res.status(200).json({
        status: "success",
        message: "Successfully get All Comment by Discussion",
        data: comment,
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
      const discussion = await Discussion.findOne({
        where: {
          id: id_discussion,
          id_course,
        },
      });
      if (!discussion) {
        throw new Error("Discussion not found");
      }
      const comment = await Comment.findByPk(id_comment);
      if (!comment) {
        throw new Error("Comment not found");
      }
      if (comment.id_user !== id_user) {
        throw new Error("You are not allowed User to edit");
      }
      validateCreateCommentSchema({ body });
      await comment.update({
        body,
        isEdited: true,
      });

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

      const discussion = await Discussion.findOne({
        where: {
          id: id_discussion,
          id_course,
        },
      });
      if (!discussion) {
        throw new Error("Discussion not found");
      }
      const comment = await Comment.destroy({
        where: {
          id_comment,
        },
      });
      if (!comment) {
        throw new Error("Comment not found");
      }
      res.status(200).json({
        status: "success",
        message: "Successfully delete comment",
      });
    } catch (error) {
      next(error);
    }
  },
};
