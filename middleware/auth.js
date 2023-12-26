const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
    let token = req.headers.authorization;
    if(token) {
        jwt.verify(token, process.env.ADM_KEY, (err, decodedToken)=> {
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

const userAuth = (req, res, next) => {
    let token = req.cookie.token;
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
        res.status(401).json({ error: 'Unauthorized Access' });
    }
}

const passwordAuth = (req, res, next) => {
    let token = req.params.token;
    if(token) {
        jwt.verify(token, process.env.LOST_KEY, (err, decodedToken)=> {
            if(err) {
                console.log(err.message)
                res.status(401).json({error: 'Invalid Token'})
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.status(401).json({ error: 'Unauthorized Access' });
    }
}

module.exports = { adminAuth, userAuth, passwordAuth };