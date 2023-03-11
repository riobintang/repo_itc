const Joi = require("joi");

const createCommentSchema = Joi.object({
    body: Joi.string().min(4).required(),
});

const filePhotoCommentSchema = Joi.object({
    fieldname: Joi.string().required(),
    mimetype: Joi.string().valid("image/jpeg", "image/png", "image/jpg"),
    filename: Joi.string().required(),
}).unknown();

module.exports = { createCommentSchema, filePhotoCommentSchema };