const { filePhotoSchema, articleSchema } = require("./schema");

function validateArticleImageSchema(payload) {
  const validateResult = filePhotoSchema.validate(payload);
  if (validateResult.error) {
    throw new Error(validateResult.error.message);
  }
}

function validateArticleValueSchema(payload) {
  const validateResult = articleSchema.validate(payload);
  if (validateResult.error) {
    throw new Error(validateResult.error.message);
  }
}

module.exports = { validateArticleImageSchema, validateArticleValueSchema };
