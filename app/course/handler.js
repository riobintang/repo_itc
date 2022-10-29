const { Course } = require("../../models");

module.exports = {
    handlerGetCourse: async (req, res, next) => {
        try {
            const courses = await Course.findAll();
            res.status(200).json({
                status : "success",
                message: "Successfully get all courses",
                data: courses,
            });
        } catch (error) {
            next(error);
        }
    },
    handlerPostCourse: async (req, res, next) => {
        try {
            const {title, description, image_thumbnail, id_division, id_user} = req.body;
            const course = await Course.create({
                title: title,
                description: description,
                image_thumbnail: image_thumbnail,
                id_division: id_division,
                id_user: id_user,
            });

            res.status(200).json({
                status: "success",
                message: "Successfully create course",
                data: course,
            });
        } catch (error) {
            next(error);
        }
    },
    handlerPutCourse: async (req, res, next) => {
        try {

        } catch (error) {
            next(error);
        }
    },
    handlerDeleteCourse: async (req, res, next) => {
        try {

        } catch (error) {
            next(error);
        }
    },

};