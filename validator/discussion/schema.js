const Joi = require("joi");

const createDiscussionSchema = Joi.object({
    title: Joi.string().min(4).required(),
    body: Joi.string().min(4).required(),
});

module.exports = { createDiscussionSchema };