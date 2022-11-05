const { filePhotoSchema, createCourseSchema } = require("./schema");

function validateCoursePhotoSchema(payload) {
    const validateResult = filePhotoSchema.validate(payload);
    if (validateResult.error) {
        throw new Error(validateResult.error.message);
    }
}

function validateCourseCreateUpdateSchema(payload) {
    const validateResult = createCourseSchema.validate(payload);
    if (validateResult.error) {
        throw new Error(validateResult.error.message);
    }
}

module.exports = { validateCoursePhotoSchema, validateCourseCreateUpdateSchema };