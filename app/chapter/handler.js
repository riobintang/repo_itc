const { Chapter, Article } = require("../../models");
const chaptersServices = require("../../services/mysql/chapterService");
const { updateDateCourse } = require("../../utils/courseDateUpdate");
const {
  validateCreateUpdateChapterSchema,
} = require("../../validator/chapter");

module.exports = {
  handlerGetAllChaptersByCourseID: async (req, res, next) => {
    try {
      const { id_course } = req.params;
      const chapters = await chaptersServices.getAllChaptersByCourse(id_course);
      res.status(200).json({
        status: "success",
        message: "Successfully get all chapters by course",
        data: chapters,
      });
    } catch (error) {
      next(error);
    }
  },
  //Get Title Chapter and Title Article
  handlerGetChapterAndArticle: async (req, res, next) => {
    try {
      const { id_course } = req.params;
      const chapters = await chaptersServices.getChaptersAndArticles(id_course);
      res.status(200).json({
        status: "success",
        message: "Successfully get all chapters and title articles by course",
        data: chapters,
      });
    } catch (error) {
      next(error);
    }
  },
  //Belum dipakai
  handlerGetChapterById: async (req, res, next) => {
    try {
      const { id_course, id_chapter } = req.params;
      const chapter = await chaptersServices.getChapterById(id_chapter, id_course);

      res.status(200).json({
        status: "success",
        message: "Successfully get Chapter",
        data: chapter,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerPostChapter: async (req, res, next) => {
    try {
      const { id_course } = req.params;
      const { title } = req.body;
      validateCreateUpdateChapterSchema(req.body);
      const chapter = await chaptersServices.create(title, id_course);

      res.status(200).json({
        status: "success",
        message: "Successfully add chapter",
        data: chapter,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerPutChapter: async (req, res, next) => {
    try {
      const { id_course, id_chapter } = req.params;
      const { title } = req.body;

      validateCreateUpdateChapterSchema(req.body);

      await chaptersServices.update(title, id_course, id_chapter);

      res.status(200).json({
        status: "success",
        message: "Successfully update Chapter",
      });
    } catch (error) {
      next(error);
    }
  },
  handlerDeleteChapter: async (req, res, next) => {
    try {
      const { id_course, id_chapter } = req.params;
      await chaptersServices.delete(id_chapter, id_course)
      res.status(200).json({
        status: "success",
        message: "Successfully delete chapter",
      });
    } catch (error) {
      next(error);
    }
  },
};
