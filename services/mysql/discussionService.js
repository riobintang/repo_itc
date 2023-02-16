const { Discussion, Course, User } = require("../../models");

const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

async function postDiscussion(data, id_course, id_user) {
  const course = await Course.findOne({
    where: {
      id: id_course,
    },
  });
  if (!course) {
    throw new Error("Course not found");
  }
  const createDiscussion = await Discussion.create({
    title: data.title,
    body: data.body,
    isEdited: false,
    id_course: id_course,
    id_user: id_user,
  });

  return createDiscussion;
}

async function getDiscussionByIdCourse(id_course) {
  const discussion = await Discussion.findAll({
    where: {
      id_course,
    },
    include: {
      model: User,
      attributes: ["fullName", "photoProfile"],
    },
  });

  return discussion;
}

async function getDiscussionById(id_discussion) {
  const discussion = await Discussion.findByPk(id_discussion, {
    include: {
      model: User,
      attributes: ["fullName", "photoProfile"],
    },
  });
  if (!discussion) {
    throw new Error("Discussion not found");
  }

  return discussion;
}

async function putDiscussion(data) {
  const updateDiscussion = await Discussion.findOne({
    where: {
      id: data.id_discussion,
      id_course: data.id_course,
    },
  });
  if (!updateDiscussion) {
    throw new Error("Discussion not found");
  }
  if (updateDiscussion.id_user !== data.id_user) {
    throw new Error("You are not allowed to edit this discussion");
  }
  await updateDiscussion.update({
    title: data.title,
    body: data.body,
    isEdited: true,
  });
  return updateDiscussion;
}

async function deleteDiscussion(data) {
  const deleteDiscussion = await Discussion.findByPk(data.id_discussion);
  if (!deleteDiscussion) {
    throw new Error("Discussion not found");
  }
  if (deleteDiscussion.id_user !== data.userid && data.role != "admin") {
    throw new Error("You are not allowed to delete this discussion");
  }
  await deleteDiscussion.destroy();

  return deleteDiscussion;
}

async function searchDiscussion(id_course, keyword) {
  const discussion = await Discussion.findAll({
    where: {
      id_course: id_course,
      [Op.or]: [
        {
          title: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          body: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ],
    },
    include: {
      model: User,
      attributes: ["fullName", "photoProfile"],
    },
  });

  return discussion;
}

const discussionsServices = {
    create: postDiscussion,
    getDiscussionByIdCourse,
    getDiscussionById,
    update: putDiscussion,
    delete: deleteDiscussion,
    searchDiscussion,
}

module.exports = discussionsServices;