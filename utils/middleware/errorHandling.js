const multer = require('multer');
const ApiErrors = require('../errors/api.errors');

function imageError(err, req, res, next) {
    if(err instanceof multer.MulterError) {
        console.log(err.message)
        return res.status(400).json({error: err.message})
    }
    next(err);
}

function logicErrorHandler(err, req, res, next) {
    if (err instanceof ApiErrors) {
        return res.status(err.statusCode).json({
            status: err.statusCode,
            error: err.errorCode,
            message: err.message,
        });
    }

    // Unknown errors
    return res.status(500).json({
        status: 500,
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong'
    });
}

module.exports = { logicErrorHandler, imageError };