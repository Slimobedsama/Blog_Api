const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({ 
    destination: (req, file, cb)=> {
        cb(null, './public/upload')
    },
    filename: (req, file, cb)=> {
        cb(null, `${ file.fieldname }_${ Date.now() }${ path.extname(file.originalname) }`)
    }
})

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // MAXIMUM SIZE IS 5MB
    } 
})

module.exports = upload;