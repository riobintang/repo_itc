const { requestTokenResetPasswordSchema, resetPasswordSchema } = require("./schema");



function validateRequestTokenResetPassword(payload) {
    const validateResult = requestTokenResetPasswordSchema.validate(payload);
    if (validateResult.error) {
        throw new Error(validateResult.error.message);
    }
}

function validateResetPassword(payload) {
    const validateResult = resetPasswordSchema.validate(payload);
    if (validateResult.error) {
        throw new Error(validateResult.error.message);
    }
}

module.exports = validateRequestTokenResetPassword;