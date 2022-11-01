const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const auth = async(req, res, next) => {
    let token = req.headers.authorization;
    if(!token) {
        return res.status(403).json({msg: 'A token is need for authentication'});
    }
    try {
        let verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verifiedUser.id)
        req.user = user
    } catch (err) {
        console.log(err)
        return res.status(401).json({msg: 'Inavlid Token'});
    }
    return next();
}

module.exports = auth;