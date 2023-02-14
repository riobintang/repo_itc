const { Discussion, Course, User } = require("../../models");

const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

async function postDiscussion(data) {
  const course = await Course.findOne({
    where: {
      id: data.id_course,
    },
  });
  if (!course) {
    throw new Error("Course not found");
  }
  const discussion = await Discussion.create({
    title: data.title,
    body: data.body,
    isEdited: false,
    id_course: data.id_course,
    id_user: data.id_user,
  });

  return discussion;
}

async function getDiscussionByIdCourse(id_course) {
  const discussion = await Discussion.findAll({
    where: {
      data: id_course,
    },
    include: {
      model: User,
      attributes: ["fullName", "id"],
    },
  });

  return discussion;
}

async function getDiscussionById(id_discussion) {
  const discussion = await Discussion.findByPk(id_discussion, {
    include: {
      model: User,
      attributes: ["fullName", "id_division", "username", "id"],
    },
  });
  if (!discussion) {
    throw new Error("Discussion not found");
  }

  return discussion;
}

async function putDiscussion(data) {
  const discussion = await Discussion.findOne({
    where: {
      id: data.id_discussion,
      id_course: data.id_course,
    },
  });
  if (!discussion) {
    throw new Error("Discussion not found");
  }
  if (discussion.id_user !== data.id_user) {
    throw new Error("You are not allowed to edit this discussion");
  }
  await discussion.update({
    title: data.title,
    body: data.body,
    isEdited: true,
  });
  return discussion;
}

async function deleteDiscussion(data) {
  const discussion = await Discussion.findByPk(data.id_discussion);
  if (!discussion) {
    throw new Error("Discussion not found");
  }
  if (discussion.id_user !== data.userid && data.role != "admin") {
    throw new Error("You are not allowed to delete this discussion");
  }
  await discussion.destroy();

  return discussion;
}

async function searchDiscussion(data) {
  const discussion = await Discussion.findAll({
    where: {
      id_course: data.id_course,
      [Op.or]: [
        {
          title: {
            [Op.like]: `%${data.keyword}%`,
          },
        },
        {
          body: {
            [Op.like]: `%${data.keyword}%`,
          },
        },
      ],
    },
    include: {
      model: User,
      attributes: ["fullName", "id"],
    },
  });

  return discussion;
}

const discussionsService = {
    create: postDiscussion,
    getDiscussionByIdCourse,
    getDiscussionById,
    update: putDiscussion,
    delete: deleteDiscussion,
    searchDiscussion,
}

module.exports = discussionsService;