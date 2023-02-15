const { Article, Chapter, Course } = require("../../models");
const { updateDateCourse } = require("../../utils/courseDateUpdate");
const {
  validateArticleImageSchema,
  validateArticleValueSchema,
} = require("../../validator/article");
const cloudinary = require("../../utils/cloudinary").v2;
const articlesServices = require("../../services/mysql/articleService");
module.exports = {
  handlerGetAllArticleTitleByChapterCourseID: async (req, res, next) => {
    try {
      const { id_course, id_chapter } = req.params;
      // const courseChapter = await Course.findAll({
      //   where: {
      //     id: id_course
      //   },
      //   include: [
      //     {
      //       model: Chapter,
      //       where: {
      //         id: id_chapter,
      //       }
      //     }
      //   ]
      // });
      // if (!courseChapter) {

      // }
      // const articles = await Article.findAll({
      //   where: {
      //     id_chapter: id_chapter,
      //   },
      // });
      // const articles = await Course.findAll({
      //   where: {
      //     id:id_course,
      //   },
      //   attributes: [],
      //   include: [
      //     {
      //       model: Chapter,
      //       attributes: [],
      //       where: {
      //         id:id_chapter,
      //       },
      //       include: [{ model: Article }],
      //     },
      //   ],
      // });

      // const articles = await Article.findAll({
      //   where: {
      //     id_chapter,
      //   },
      //   include: [
      //     {
      //       model: Chapter,
      //       where: {
      //         id: id_chapter
      //       },
      //       attributes: [],
      //       include: [
      //         {
      //           model: Course,
      //           where: {
      //             id: id_course,
      //           },
      //           attributes: [],
      //         },
      //       ],
      //     },
      //   ],
      // });
      const articles = await articlesServices.getAllArticleTitleByChapterAndCourseId(id_course, id_chapter)
      res.status(200).json({
        status: "success",
        message: "Successfully get all title articles by chapter",
        data: articles,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetArticleById: async (req, res, next) => {
    try {
      const { id_course, id_chapter, id_article } = req.params;
      // const article = await Article.findByPk(id_article);
      // // const course = await Course.findByPk(id_course);
      // const chapter = await Chapter.findAll({
      //   where: {
      //     id_course
      //   }
      // });
      // const json = chapter.map((item) => {
      //   return item.toJSON();
      // })
      // const check = json.find((item) => item.id == article.id_chapter)
      // if (!check) {
      //   throw new Error("Article not found");
      // }
      // if (chapter.id != article.id_chapter) {
      //   throw new Error("Article not found")
      // }
      // const json = course.map((item) => {
      //   return item.toJSON();
      // })
      //const check = json.includes(article.id_chapter);

      //console.log(check);
      // const article = await Article.findOne({
      //   where: {
      //     id: id_article,
      //   },
      //   include: [
      //     {
      //       model: Chapter,
      //       where: {
      //         id: id_chapter
      //       },
      //       attributes: [],
      //       include: [
      //         {
      //           model: Course,
      //           where: {
      //             id: id_course,
      //           },
      //           attributes: [],
      //         },
      //       ],
      //     },
      //   ],
      // });
      // if (!article) {
      //   throw new Error("Article not found");
      // }
      const article = await articlesServices.getArticleById(id_course, id_chapter, id_article);
      res.status(200).json({
        status: "success",
        message: "Successfully get article by id",
        data: article,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerPostArticle: async (req, res, next) => {
    try {
      const { title, content } = req.body;
      const { id_course, id_chapter } = req.params;
      validateArticleValueSchema({ title, content });
      const article = await articlesServices.create({title, content}, id_course, id_chapter);
      res.status(201).json({
        status: "success",
        message: "Successfully post Article",
        data: article,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerPostImageArticle: async (req, res, next) => {
    try {
      validateArticleImageSchema(req.file);
      const result = await articlesServices.createImage(req.file.path)
      res.status(200).json({
        location: result.secure_url,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerPutArticle: async (req, res, next) => {
    try {
      const { id_article } = req.params;
      const { title, content } = req.body;
      validateArticleValueSchema({ title, content });
      // const article = await Article.update(
      //   {
      //     title,
      //     content,
      //   },
      //   {
      //     where: {
      //       id: id_article,
      //     },
      //   }
      // );
      // if (!article) {
      //   throw new Error("Article not found");
      // }
      await articlesServices.update({title, content}, id_article);
      res.status(201).json({
        status: "success",
        message: "Successfully update Article",
      });
    } catch (error) {
      next(error);
    }
  },
  handlerDeleteArticle: async (req, res, next) => {
    try {
      const { id_article } = req.params;
      // const article = await Article.findByPk(id_article);
      // if (!article) {
      //   throw new Error("Article not found");
      // }

      // await article.destroy();
      await articlesServices.delete(id_article);
      res.status(200).json({
        status: "success",
        message: "Successfully delete Article",
      });
    } catch (error) {
      next(error);
    }
  },
  handlerDeleteImageArticle: async (req, res, next) => {
    try {
      const { location } = req.body;
      await articlesServices.deleteImage(location);
      res.status(201).json({
        status: "success",
        message: "Successfully delete Image Article",
      });
    } catch (error) {
      next(error);
    }
  },
};
