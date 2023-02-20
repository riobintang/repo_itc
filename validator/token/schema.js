const Joi = require("joi");

const requestTokenResetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
}).unknown();

const verifyOTPTokenSchema = Joi.object({
  otp: Joi.number().min(5).required(),
  token: Joi.string().min(240).required(),
}).unknown();

const resetPasswordSchema = Joi.object({
  password: Joi.string().min(8).required(),
}).unknown();

module.exports = { requestTokenResetPasswordSchema, verifyOTPTokenSchema, resetPasswordSchema};
