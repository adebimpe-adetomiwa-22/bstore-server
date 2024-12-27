const { CustomError } = require('../errors/customError');
const errorHandler = async (err, req, res, next) => {
    const error = String(err);
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send(err.message);
    } else if (error.startsWith('ValidationError')) {
        res.status(400).send(error);
    }
    return res.status(500).send(`Server error: Internal server error.`);
};

module.exports = errorHandler;
