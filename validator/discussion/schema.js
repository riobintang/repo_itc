const Joi = require("joi");

const createDiscussionSchema = Joi.object({
    title: Joi.string().min(4).required(),
    body: Joi.string().min(4).required(),
});
const filePhotoDiscussionSchema = Joi.object({
    fieldname: Joi.string().required(),
    mimetype: Joi.string().valid("image/jpeg", "image/png", "image/jpg"),
    filename: Joi.string().required(),
}).unknown();

module.exports = { createDiscussionSchema, filePhotoDiscussionSchema };