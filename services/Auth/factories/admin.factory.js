const AdminDao = require('../dao/admin.dao');
const bcrypt = require('bcrypt');
const { adminToken } = require('../../../utils/helpers/genToken');
const ApiErrors = require('../../../utils/errors/api.errors');

async function adminLoginFactory(email, password) {
    const checkMail = await AdminDao.findByEmail(email);

    if(!checkMail) throw ApiErrors.notFound('Incorrect email or password', 'NOT_FOUND');

    const confirmedPassword = await bcrypt.compare(password, checkMail.password);

    if(!confirmedPassword) throw ApiErrors.notFound('Incorrect email or password', 'NOT_FOUND');

    const token = adminToken(confirmedPassword._id);

    return {
        status: 200,
        message: 'Successful login',
        token
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