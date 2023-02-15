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
