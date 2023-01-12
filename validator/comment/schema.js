const Joi = require("joi");

const createCommentSchema = Joi.object({
    body: Joi.string().min(4).required(),
});

module.exports = { createCommentSchema };