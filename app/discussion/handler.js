const { Discussion, Course, User } = require("../../models");
const {
    validateCreateDiscussionSchema
} = require("../../validator/discussion");

module.exports = {
    // handler post for discussion
    handlerPostDiscussion: async (req, res, next) => {
        try {
            const id_user = req.user.id;
            const { title, body } = req.body;
            const { id_course } = req.params;
            validateCreateDiscussionSchema({ title, body });
            const course = await Course.findOne({
                where: {
                    id: id_course,
                },
            });
            if (!course) {
                throw new Error("Course not found");
            }
            const discussion = await Discussion.create({
                title,
                body,
                isEdited: false,
                id_course,
                id_user,
            });

            res.status(201).json({
                status: "success",
                message: "Successfully post Chapter",
                data: discussion,
            });
        } catch (error) {
            next(error);
        }
    },
}