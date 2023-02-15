const { Article, Chapter, Course } = require("../../models");
const {
  uploadImage,
  deleteImage,
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
    body: data.content,
    id_chapter,
  });

  return article;
}

async function postImage(image) {
  const result = await uploadImage(image, "article");
  return result;
}

async function putArticle(data, id_article) {
  const article = await Article.update(
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
  if (!article) {
    throw new Error("Article not found");
  }

  return article;
}

async function deleteArticle(id_article) {
  const article = await Article.findByPk(id_article);
  if (!article) {
    throw new Error("Article not found");
  }

  await article.destroy();
  return article;
}

async function deleteImageArticle(location) {
    const deleteImageLocation = location.split("/").pop().split(".")[0];
    const deleteImg = `itc-repo/article/${deleteImageLocation}`;

    const result = await cloudinary.uploader.destroy(deleteImg); // delete image in cloudinary

    if (result.result !== "ok") {
      throw new Error("Failed to delete image");
    }
    return result;
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