const { Comment, Discussion, User } = require("../../models");

async function postComment(data, id_user) {
  const discussion = await Discussion.findOne({
    where: {
      id: data.id_discussion,
      id_course: data.id_course,
    },
  });
  if (!discussion) {
    throw new Error("Discussion not found");
  }
  const comment = await Comment.create({
    body: data.body,
    isEdited: false,
    id_discussion: data.id_discussion,
    id_user,
  });

  return comment;
}

async function getCommentDiscussion(id_discussion, id_course) {
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
    include: [{ model: User, attributes: ["id", "fullName"] }],
  });

  return comment;
}

async function putComment(data, id_course, id_discussion, id_comment, id_user) {
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
    body: data.body,
    isEdited: true,
  });
  return comment;
}

async function deleteComment(id_course, id_discussion, id_comment, user) {
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
  // Check authority
  console.log(req.user.role);
  if (user.id !== comment.id_user && user.role !== "admin") {
    throw new Error("You are not allowed");
  }
  await comment.destroy();

  return comment;
}

const commentsServices = {
  create: postComment,
  getAll: getCommentDiscussion,
  update: putComment,
  delete: deleteComment,
};

module.exports = commentsServices;