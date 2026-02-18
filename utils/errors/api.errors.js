class ApiErrors extends Error {
    constructor(statusCode, message, errorCode = null) {
        super(message); 

        this.statusCode = statusCode;
        this.errorCode = errorCode;

        Error.captureStackTrace (this, this.constructor);
    }

    static badRequest(message, errorCode) {
        return new ApiErrors(400, message, errorCode);
    }

    static notFound(message, errorCode) {
        return new ApiErrors(404, message, errorCode);
    }

    static unauthorized(message, errorCode) {
        return new ApiErrors(401, message, errorCode);
    }

    static duplicateRequest(message, errorCode) {
        return new ApiErrors(409, message, errorCode);
    }

    static internalServer(message = 'Internal server error', errorCode) {
        return new ApiErrors(500, message, errorCode);
    }

    static forbidden(message, errorCode) {
        return new ApiErrors(403, message, errorCode);
    }
}

module.exports = ApiErrors;