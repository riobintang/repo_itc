const Joi = require("joi");

const requestTokenResetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
}).unknown();

const verifyOTPSchema = Joi.object({
  otp: Joi.number().min(5).required(),
}).unknown();

const resetPasswordSchema = Joi.object({
  password: Joi.string().min(8).required(),
}).unknown();

module.exports = { requestTokenResetPasswordSchema, verifyOTPSchema, resetPasswordSchema};
