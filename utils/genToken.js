const jwt = require('jsonwebtoken');

const adminToken = (id)=> {
    return jwt.sign({ id }, process.env.ADM_KEY, { expiresIn: process.env.ADM_KEY_EXPIRES });
}

const userToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: process.env.EXPIRES_IN});
}

const resetToken = (email)=> {
    return jwt.sign({ email }, process.env.LOST_KEY ,{ expiresIn: process.env.LOST_KEY_EXPIRES });
} 
module.exports = { adminToken, userToken, resetToken };