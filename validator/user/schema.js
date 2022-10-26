const Joi = require("joi");

const userRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().min(4).required(),
  fullName: Joi.string().min(6).required(),
  password: Joi.string().min(8).required(),
  id_division: Joi.number().required(),
}).unknown();

const userUpdateSchema = Joi.object({
  username: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  fullName: Joi.string().min(6).required(),
  password: Joi.string().min(8).required(),
  phoneNumber: Joi.string().min(9).required(),
  angkatan: Joi.string().min(4).required(),
}).unknown();

const userCreateSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().min(4).required(),
  fullName: Joi.string().min(6).required(),
  password: Joi.string().min(8).required(),
  id_division: Joi.string().min(3).required(),
  id_role: Joi.string().min(3).required(),
});

module.exports = { userRegisterSchema, userUpdateSchema, userCreateSchema };
