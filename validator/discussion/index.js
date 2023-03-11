const { createDiscussionSchema, filePhotoDiscussionSchema } = require("./schema");

function validateCreateDiscussionSchema(payload) {
    const validateResult = createDiscussionSchema.validate(payload);
    if (validateResult.error) {
        throw new Error(validateResult.error.message);
    }
}

function validateDiscussionImageSchema(payload) {
    const validateResult = filePhotoDiscussionSchema.validate(payload);
    if (validateResult.error) {
        throw new Error(validateResult.error.message);
    }
}

module.exports = { validateCreateDiscussionSchema, validateDiscussionImageSchema };