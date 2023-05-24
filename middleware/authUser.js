const jwt = require('jsonwebtoken');


const auth = (req, res, next) => {
    let token = req.headers.authorization;
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken)=> {
            if(err) {
                console.log(err.message)
                res.status(401).json({error: 'Invalid Token'})
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.status(403).json({error: 'Forbidden'});
    }
}

module.exports = auth;