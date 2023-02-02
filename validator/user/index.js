const {
  userUpdateSchema,
  userRegisterSchema,
  userCreateSchema,
  userLoginSchema,
  userFilePhotoProfileSchema,
} = require("./schema");

function validateRegisterUserSchema(payload) {
  const validateResult = userRegisterSchema.validate(payload);
  if (validateResult.error) {
    throw new Error(validateResult.error.message);
  }
}

function validateUpdateUserSchema(payload) {
  const validateResult = userUpdateSchema.validate(payload);
  if (validateResult.error) {
    throw new Error(validateResult.error.message);
  }
}

function validateCreateUserSchema(payload) {
  const validateResult = userCreateSchema.validate(payload);
  if (validateResult.error) {
    throw new Error(validateResult.error.message);
  }
}

function validateLoginUserSchema(payload) {
  const validateResult = userLoginSchema.validate(payload);
  if (validateResult.error) {
    throw new Error(validateResult.error.message);
  }
}

function validateUserFilePhotoProfileSchema(payload) {
  const validateResult = userFilePhotoProfileSchema.validate(payload);
  if (validateResult.error) {
    throw new Error(validateResult.error.message);
  }
}
module.exports = {
  validateRegisterUserSchema,
  validateUpdateUserSchema,
  validateCreateUserSchema,
  validateLoginUserSchema,
  validateUserFilePhotoProfileSchema,
};
