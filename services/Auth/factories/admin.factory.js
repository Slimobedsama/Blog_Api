const AdminDao = require('../dao/admin.dao');
const bcrypt = require('bcrypt');
const { adminToken, genRefreshToken } = require('../../../utils/helpers/genToken');
const ApiErrors = require('../../../utils/errors/api.errors');
const {} = require('../dao/refresh.token.dao');
const refreshTokenDao = require('../dao/refresh.token.dao');

async function adminLoginFactory(email, password) {
    const checkMail = await AdminDao.findByEmail(email);

    if(!checkMail) throw ApiErrors.notFound('Incorrect email or password', 'NOT_FOUND');

    const confirmedPassword = await bcrypt.compare(password, checkMail.password);

    if(!confirmedPassword) throw ApiErrors.notFound('Incorrect email or password', 'NOT_FOUND');

    const token = adminToken(checkMail._id);
    const refreshToken = genRefreshToken(checkMail._id);

    const refreshTokenData = {
        token: refreshToken,
        expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000)
    }

    await refreshTokenDao.createRefreshToken(refreshTokenData);

    return {
        status: 200,
        error: null,
        message: 'Successful login',
        _id: checkMail._id,
        lastName: checkMail.lastName,
        firstName: checkMail.firstName,
        isAdmin: checkMail.isAdmin,
        token,
        refreshToken,
    }

}

async function allAdminFactory() {
    const findAdmins = await AdminDao.getAllAdmin();

    if(!findAdmins) return {
        status: 200,
        error: 'NOT_FOUND',
        message: 'Admin not found',
        result: findAdmins
    }

    return {
        status: 200,
        error: null,
        message: 'Admins fetched successfully',
        result: findAdmins
    }
}

module.exports = {
    adminLoginFactory,
    allAdminFactory
}