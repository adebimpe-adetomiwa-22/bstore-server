class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const customError = (message, statusCode) =>
    new CustomError(message, statusCode);

module.exports = { CustomError, customError };
