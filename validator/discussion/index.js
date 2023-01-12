const { createDiscussionSchema } = require("./schema");

function validateCreateDiscussionSchema(payload) {
    const validateResult = createDiscussionSchema.validate(payload);
    if (validateResult.error) {
        throw new Error(validateResult.error.message);
    }
}

module.exports = { validateCreateDiscussionSchema };