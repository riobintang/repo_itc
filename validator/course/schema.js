const Joi = require("joi");

const filePhotoSchema = Joi.object({
    fieldname: Joi.string().required(),
    mimetype: Joi.string().valid("image/jpeg", "image/png", "image/jpg"),
    filename: Joi.string().required(),
}).unknown();

const createCourseSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    id_division: Joi.number().required(),
}).unknown();

module.exports = { filePhotoSchema, createCourseSchema };