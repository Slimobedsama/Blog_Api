const logger = require('../../logger');

const tryAndCatch = (controller) => async(req, res, next) => {
    try {
        await controller(req, res, next)
    } catch (err) {
        logger.error(err.message && err.stack)
        // console.log(err)
        next(err);
    }
}

module.exports = tryAndCatch