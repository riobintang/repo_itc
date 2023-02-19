const Joi = require("joi");

const filePhotoSchema = Joi.object({
    path: Joi.string().required(),
    mimetype: Joi.string().valid("image/jpeg", "image/png", "image/jpg").required(),
    filename: Joi.string().required(),
}).required().unknown();

const createCourseSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    id_division: Joi.number().required(),
}).unknown();

module.exports = { filePhotoSchema, createCourseSchema };