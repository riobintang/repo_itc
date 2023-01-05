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
    }, 
    handlerGetArticleById: async (req, res, next) => {
        try {
            const { id_article } = req.params;
            const article = await Article.findOne({
                where: {
                    id: id_article
                }
            });
            res.status(200).json({
                status: "Success",
                message:"Successfully get article by id",
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
            const chapter = await Chapter.findOne({
                where: {
                    id: id_chapter,
                    id_course
                }
            });
            if (!chapter) {
                throw new Error("Chapter not found");
            }
            const article = await Article.create({
                title,
                body: content,
                id_chapter,
            });

            res.status(201).json({
                status: "success",
                message: "Successfully post Article",
                data: article,
            });
        } catch (error) {
            next(error);
        }
    }
}
