const { Article, Chapter, Course } = require("../../models");
const { updateDateCourse } = require("../../utils/courseDateUpdate");

module.exports = {
    handlerGetAllArticleTitleByChapterCourseID: async (req, res, next) => {
        try {
            const { id_course, id_chapter } = req.params;
            const articles = await Article.findAll({
                where: {
                    id_chapter: id_chapter,
                }
            });
            res.status(200).json({
                status: "success",
                message: "Successfully get all title article by specific chapter",
                data: articles,
            });
        } catch (error) {
            next(error);
        }
    }
}
