const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({ 
    filename: (req, file, cb)=> {
        cb(null, `${ file.fieldname }_${ Date.now() }${ path.extname(file.originalname) }`)
    }
})

const fileFilter = (req, file, cb)=> {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false);
    }
}

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // MAXIMUM SIZE IS 5MB
    },
    fileFilter: fileFilter
})

module.exports = upload;