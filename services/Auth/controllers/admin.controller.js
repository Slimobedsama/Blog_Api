const tryAndCatch = require('../../../utils/helpers/try.catch');
const { adminLoginFactory, allAdminFactory } = require('../factories/admin.factory');

exports.access = tryAndCatch(async(req, res) => {
    const { email, password } = req.body;
    const { status, token, refreshToken, ...more } = await adminLoginFactory(email, password);

    res.cookie('admin', token, { httpOnly: true, maxAge:  30 * 60 * 1000 });
    res.cookie('refresh', refreshToken, { httpOnly: true, maxAge: 6 * 60 * 60 * 1000 });

    res.status(status).json({ status, ...more });
});

exports.getAll = tryAndCatch(async(req, res) => {
    const { status, ...more } = await allAdminFactory();

    res.status(status).json({ status, ...more });
});