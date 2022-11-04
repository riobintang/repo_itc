const { filePhotoSchema } = require("./schema");

function validateCoursePhotoSchema(payload) {
    const validateResult = filePhotoSchema.validate(payload);
    if (validateResult.error) {
        throw new Error(validateResult.error.message);
    }
}

module.exports = { validateCoursePhotoSchema };