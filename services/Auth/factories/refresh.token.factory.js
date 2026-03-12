const RefreshTokenDao = require('../dao/refresh.token.dao');
const ApiErrors = require('../../../utils/errors/api.errors');

createRefreshTokenFactory = async function(data) {
    return await RefreshTokenDao.createRefreshToken(data);
}

getRefreshTokenFactory = async function(token) {
    return await RefreshTokenDao.getRefreshToken(token);
}

module.exports = {
    createRefreshTokenFactory,
    getRefreshTokenFactory,
}