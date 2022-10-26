const {
  userUpdateSchema,
  userRegisterSchema,
  userCreateSchema,
} = require("./schema");

function validateRegisterUserChema(payload) {
  const validateResult = userRegisterSchema.validate(payload);
  if (!validateResult) {
    throw new Error(validateResult.error.message);
  }
}

function validateUpdateUserSchema(payload) {
  const validateResult = userUpdateSchema.validate(payload);
  if (!validateResult) {
    throw new Error(validateResult.error.message);
  }
}

function validateCreateUserSchema(payload) {
  const validateResult = userCreateSchema.validate(payload);
  if (!validateResult) {
    throw new Error(validateResult.error.message);
  }
}
module.exports = { validateRegisterUserChema, validateUpdateUserSchema, validateCreateUserSchema };
