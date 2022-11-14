const { Chapter } = require("../../models");
const {updateDateCourse} = require("../../utils/courseDateUpdate");
const { validateCreateUpdateChapterSchema } = require("../../validator/chapter");

module.exports = {
  handlerGetAllChaptersByCourseID: async (req, res, next) => {
    try {
      const { id_course } = req.params;
      const chapters = await Chapter.findAll({
        where: {
          id_course: id_course,
        },
      });
      res.status(200).json({
        status: "success",
        message: "Successfully get All Chapters",
        data: chapters,
      }); 
    } catch (error) {
      next(error);
    }
  },
  //Belum dipakai
  handlerGetChapterById: async (req, res,next) => {
    try {
      const { id_course, id_chapter } = req.params;
      const chapter = await Chapter.findByPK(id_chapter);

      if (!chapter) {
        throw new Error("Chapter not found");
      }

      res.status(200).json({
        status: "success",
        message: "Successfully get Chapter",
        data: chapter,
      });

    } catch(error){ 
      next(error);
    }
  },
  handlerPostChapter: async (req, res, next) => {
    try {
      const { id_course } = req.params;
      const { title } = req.body;
      validateCreateUpdateChapterSchema(req.body);
      const chapter = await Chapter.create({
        title: title,
        id_course: id_course,
      });
      await updateDateCourse(id_course);
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
      
      const chapter = await Chapter.findByPK(id_chapter);
      if (chapter.id_course != id_course) {
        throw new Error("Course not found");
      }
      if (!chapter) {
        throw new Error("Chapter not found");
      }
      validateCreateUpdateChapterSchema(req.body);
      await chapter.update({
        title: title,
      });
      await chapter.save();
      await updateDateCourse(id_course);
      res.status(200).json({
        status: "success",
        message: "Successfully update Chapter",
        data: chapter,
      })
    } catch(error) {
      next(error);
    }
  },
  handlerDeleteChapter: async (req, res, next) => {
    try {
      const { id } = req.params;
      const chapter = await Chapter.findByPK(id);
      if (!chapter) {
        throw new Error("Chapter not found");
      }

      await chapter.destroy();
      await updateDateCourse(id_course);
      res.status(200).json({
        status: "success",
        message: "Successfully delete chapter",
      });
    } catch(error) {
      next(error);
    }
  }
};
