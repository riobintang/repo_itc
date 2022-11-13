const { createChapterSchema } = require("./schema");

function validateCreateChapterSchema(payload) {
    const validateResult = createChapterSchema.validate(payload);
    if (validateResult.error) {
        throw new Error(validateResult.error.message);
    }
}

module.exports = { validateCreateChapterSchema };