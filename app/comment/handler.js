const { Comment, Discussion } = require("../../models");
const {
    validateCreateCommentSchema,
} = require("../../validator/comment");

module.exports = {
    // handler post for comment
    handlerPostComment: async (req, res, next) => {
        try {
            const id_user = req.user.id;
            const { body } = req.body;
            const { id_course, id_discussion } = req.params;
            validateCreateCommentSchema({ body });
            const discussion = await Discussion.findOne({
                where: {
                    id: id_discussion,
                    id_course,
                },
            });
            if (!discussion) {
                throw new Error("Discussion not found");
            }
            const comment = await Comment.create({
                body,
                isEdited: false,
                id_discussion,
                id_user,
            });
            
            res.status(201).json({
                status: "success",
                message: "Successfully post Comment",
                data: comment,
            });
        } catch (error) {
            next(error);
        }
    },
}