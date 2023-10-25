const jwt = require('jsonwebtoken');

const adminGenToken = (id)=> {
    return jwt.sign({ id }, process.env.ADM_KEY, { expiresIn: process.env.ADM_KEY_EXPIRES });
}

const genToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.EXPIRES_IN});
}

module.exports = { adminGenToken, genToken };