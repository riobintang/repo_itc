const { createChapterSchema } = require("./schema");

function validateCreateUpdateChapterSchema(payload) {
    const validateResult = createChapterSchema.validate(payload);
    if (validateResult.error) {
        throw new Error(validateResult.error.message);
    }
}

module.exports = { validateCreateUpdateChapterSchema };