const jwt = require('jsonwebtoken');
const { adminToken, genRefreshToken } = require('../helpers/genToken');
const { createRefreshTokenFactory, getRefreshTokenFactory } = require('../../services/Auth/factories/refresh.token.factory');

const adminAuth = (req, res, next) => {
    const token = req.cookies.admin;
   
    if(!token) {
        return tokenRefresher(req, res, next);
    }

    jwt.verify(token, process.env.ADM_KEY, (err, decodedToken)=> {
        if(err) {    
            if(err.name === 'TokenExpiredError') {
                console.log(err.name)
                return tokenRefresher(req, res, next);
            }
    
            return res.status(401).json({
                status: 401,
                error: 'UNAUTHORIZED_ACCESS', 
                message: 'Token invalid' 
            });
        } 
    
        req.adminId = decodedToken.id;
        
        next();
    });
}

const userAuth = (req, res, next) => {
    let token = req.cookies.jwt;
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
    let token = req.cookies.jwt;
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

const tokenRefresher = (req, res, next) => {
    const refreshedToken = req.cookies.refresh;
   
    if(refreshedToken) {
        jwt.verify(refreshedToken, process.env.REFRESH_TOKEN, async(err, decoded) => {
            if(err) {
                return res.status(401).json({ status: 401, error: 'UNAUTHORIZED ACCESS', message: 'Expired token' });
            }
    
            const isRefreshTokenValid = await getRefreshTokenFactory(refreshedToken);
            
            if(!isRefreshTokenValid) {
                return res.status(401).json({
                    status: 401,
                    error: 'UNAUTHORIZED',
                    message: 'Invalid token'
                })
            }
    
            const token = adminToken(decoded.id);
            const refreshToken = genRefreshToken(decoded.id);
            await createRefreshTokenFactory({
                token: refreshToken,
                expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000)
            });
    
            res.cookie('admin', token, { httpOnly: true, maxAge: 30 * 60 * 1000 });
            res.cookie('refresh', refreshToken, { httpOnly: true, maxAge: 6 * 60 * 60 * 1000 });
    
            req.adminId = decoded.id;
    
            next();
        });
    } else {
        res.status(401).json({
            status: 401,
            error: 'UNATHOURIZED ACCESS',
            message: 'Invalid token'
        });
    }

}

module.exports = { adminAuth, userAuth, passwordAuth };