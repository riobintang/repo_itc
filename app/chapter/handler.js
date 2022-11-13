const { Chapter } = require("../../models");

module.exports = {
  handlerGetAllChapters: async (req, res, next) => {
    try {
      const chapters = await Chapter.findAll();
      res.status(200).json({
        status: "success",
        message: "Successfully get All Chapters",
        data: chapters,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerPostChapter: async(req, res, next) => {
    
  }
};
