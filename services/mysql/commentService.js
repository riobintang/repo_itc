const { Comment, Discussion, User } = require("../../models");

async function postComment(data, id_user, id_course, id_discussion) {
  const discussion = await Discussion.findOne({
    where: {
      id: id_discussion,
      id_course: id_course,
    },
  });
  if (!discussion) {
    throw new Error("Discussion not found");
  }
  const createComment = await Comment.create({
    body: data.body,
    isEdited: false,
    id_discussion: id_discussion,
    id_user,
  });

  return createComment;
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

  const comments = await Comment.findAll({
    where: {
      id_discussion,
    },
    include: [{ model: User, attributes: ["id", "fullName"] }],
  });

  return comments;
}

async function putComment(data, id_course, id_discussion, id_comment, id_user) {
  const discussionUpdateComment = await Discussion.findOne({
    where: {
      id: id_discussion,
      id_course,
    },
  });
  if (!discussionUpdateComment) {
    throw new Error("Discussion not found");
  }
  const updateComment = await Comment.findByPk(id_comment);
  if (!updateComment) {
    throw new Error("Comment not found");
  }
  if (updateComment.id_user !== id_user) {
    throw new Error("You are not allowed User to edit");
  }
  
  await updateComment.update({
    body: data.body,
    isEdited: true,
  });
  return updateComment;
}

async function deleteComment(id_course, id_discussion, id_comment, user) {
  const discussionDeleteComment = await Discussion.findOne({
    where: {
      id: id_discussion,
      id_course,
    },
  });
  if (!discussionDeleteComment) {
    throw new Error("Discussion not found");
  }

  const deleteComment = await Comment.findByPk(id_comment);
  if (!deleteComment) {
    throw new Error("Comment not found");
  }
  // Check authority
  if (user.id !== deleteComment.id_user && user.role !== "admin") {
    throw new Error("You are not allowed");
  }
  await deleteComment.destroy();

  return deleteComment;
}

const commentsServices = {
  create: postComment,
  getAll: getCommentDiscussion,
  update: putComment,
  delete: deleteComment,
};

module.exports = commentsServices;