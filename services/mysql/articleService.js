const { Article, Chapter, Course } = require("../../models");
const {
  uploadImage,
  deleteImage,
  deleteImageWithLink,
} = require("../../utils/cloudinary/imageServiceCloudinary");

async function getAllArticleTitleByChapterAndCourseId(id_course, id_chapter) {
  const articles = await Article.findAll({
    where: {
      id_chapter,
    },
    include: [
      {
        model: Chapter,
        where: {
          id: id_chapter,
        },
        attributes: [],
        include: [
          {
            model: Course,
            where: {
              id: id_course,
            },
            attributes: [],
          },
        ],
      },
    ],
  });
  return articles;
}

async function getArticleById(id_course, id_chapter, id_article) {
  const article = await Article.findOne({
    where: {
      id: id_article,
    },
    include: [
      {
        model: Chapter,
        where: {
          id: id_chapter,
        },
        attributes: [],
        include: [
          {
            model: Course,
            where: {
              id: id_course,
            },
            attributes: [],
          },
        ],
      },
    ],
  });
  if (!article) {
    throw new Error("Article not found");
  }
  return article;
}

async function postArticle(data, id_course, id_chapter) {
  const chapter = await Chapter.findOne({
    where: {
      id: id_chapter,
      id_course,
    },
  });
  if (!chapter) {
    throw new Error("Chapter not found");
  }
  const article = await Article.create({
    title: data.title,
    content: data.content,
    id_chapter,
  });

  return article;
}

async function postImage(image) {
  const resultPost = await uploadImage(image, "article");
  return resultPost;
}

async function putArticle(data, id_article) {
  const updateArticle = await Article.update(
    {
      title: data.title,
      content: data.content,
    },
    {
      where: {
        id: id_article,
      },
    }
  );
  if (!updateArticle) {
    throw new Error("Article not found");
  }

  return updateArticle;
}

async function deleteArticle(id_article) {
  const deleteArticle = await Article.findByPk(id_article);
  if (!deleteArticle) {
    throw new Error("Article not found");
  }

  await deleteArticle.destroy();
  return deleteArticle;
}

async function deleteImageArticle(location) {
    const deleteImageLocation = location.split("/").pop().split(".")[0];
    const deleteImg = `itc-repo/article/${deleteImageLocation}`;

    const resultDelete = await deleteImageWithLink(deleteImg) // delete image in cloudinary

    if (resultDelete.result !== "ok") {
      throw new Error("Failed to delete image");
    }
    return resultDelete;
}

const articlesServices = {
    create: postArticle,
    createImage: postImage,
    update: putArticle,
    delete: deleteArticle,
    deleteImage: deleteImageArticle,
    getAllArticleTitleByChapterAndCourseId,
    getArticleById,
}

module.exports = articlesServices;