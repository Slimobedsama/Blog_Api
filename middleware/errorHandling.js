const multer = require('multer');

function imageError(err, req, res, next) {
    if(err instanceof multer.MulterError) {
        console.log(err.message)
        return res.status(400).json({error: err.message})
    }
}

module.exports = imageError;