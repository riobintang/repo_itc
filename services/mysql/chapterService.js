const { Chapter, Article, Course, sequelize } = require("../../models");
const { updateDateCourse } = require("../../utils/courseDateUpdate");

async function getAllChaptersByCourse(id_course) {
  const chapters = await Chapter.findAll({
    where: {
      id_course: id_course,
    },
  });
  return chapters;
}

async function getChaptersAndArticles(id_course) {
  const chapters = await Chapter.findAll({
    where: {
      id_course: id_course,
    },
    include: [{ model: Article, attributes: ["id", "title", "id_chapter"], }],
    order: [[ 'id', 'ASC'],[Article, 'id', 'ASC'],],
  });
  return chapters;
}

async function getChapterById(id, id_course) {
  const chapter = await Chapter.findByPk(id, {
    include: [
      {
        model: Course,
        attributes: ["id"],
        where: {
          id: id_course,
        },
      },
    ],
  });

  if (!chapter) {
    throw new Error("Chapter not found");
  }
  return chapter;
}

async function postChapter(title, id_course) {
  const t = await sequelize.transaction();
  try {
    const createChapter = await Chapter.create(
      {
        title: title,
        id_course: id_course,
      },
    );

    await updateDateCourse(id_course);
    

    return createChapter;

  } catch (error) {
    throw new Error(error);
  }
}

async function putChapter(title, id_course, id_chapter) {
  try {
    const updateChapter = await Chapter.findByPk(id_chapter);
    if (!updateChapter) {
      throw new Error("Chapter not found");
    }
    if (updateChapter.id_course != id_course) {
      throw new Error("Chapter from Course not found");
    }

    await updateChapter.update(
      {
        title: title,
      },
 
    );

    await updateDateCourse(id_course);

    return updateChapter;
  } catch (error) {

    throw new Error(error);
  }
}

async function deleteChapter(id_chapter, id_course) {
  const deleteChapter = await Chapter.findByPk(id_chapter);
  if (!deleteChapter) {
    throw new Error("Chapter not found");
  }
  if (deleteChapter.id_course != id_course) {
    throw new Error("Chapter from Course not found");
  }
  await deleteChapter.destroy();
  await updateDateCourse(id_course);

  return deleteChapter;
}

const chaptersServices = {
  create: postChapter,
  update: putChapter,
  delete: deleteChapter,
  getAllChaptersByCourse,
  getChapterById,
  getChaptersAndArticles,
};

module.exports = chaptersServices;
