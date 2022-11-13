const Joi = require("joi");

const createChapterSchema = Joi.object({
    title: Joi.string().min(4).required(),
});

module.exports = { createChapterSchema };