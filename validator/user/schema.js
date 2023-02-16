const Joi = require("joi");

const userRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().min(4).required(),
  fullName: Joi.string().min(6).required(),
  password: Joi.string().min(8).required(),
  id_division: Joi.number().required(),
}).unknown();

const userUpdateSchema = Joi.object({
  fullName: Joi.string().min(6).required(),
  phoneNumber: Joi.string().min(9).required(),
  generation: Joi.string().min(4).required(),
  id_division: Joi.number().min(1).required(),
}).unknown();

const userChangePasswordSchema = Joi.object({
  password: Joi.string().min(8).required(),
}).unknown();

const userCreateSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().min(4).required(),
  fullName: Joi.string().min(6).required(),
  password: Joi.string().min(8).required(),
  id_division: Joi.number().required(),
  id_role: Joi.number().required(),
});

const userLoginSchema = Joi.object({
  emailUsername: Joi.string().min(4).required(),
  password: Joi.string().min(8).required(),
}).unknown();

const userFilePhotoProfileSchema = Joi.object({
  fieldname: Joi.string().required(),
  mimetype: Joi.string().valid("image/jpeg", "image/png", "image/jpg"),
  filename: Joi.string().required(),
}).unknown();

const userUpdateProfilePasswordSchema = Joi.object({
  username: Joi.string().min(4).required(),
  password: Joi.string().min(8).required(),
  fullName: Joi.string().min(6).required(),
  phoneNumber: Joi.string().min(9).required(),
  generation: Joi.string().min(4).required(),
  id_division: Joi.number().min(1).required(),
  email: Joi.string().email().required(),
})
.unknown();

const userVerifySchema = Joi.object({
  verify: Joi.boolean().required(),
}).unknown();

module.exports = {
  userRegisterSchema,
  userUpdateSchema,
  userChangePasswordSchema,
  userCreateSchema,
  userLoginSchema,
  userFilePhotoProfileSchema,
  userUpdateProfilePasswordSchema,
  userVerifySchema,
};
