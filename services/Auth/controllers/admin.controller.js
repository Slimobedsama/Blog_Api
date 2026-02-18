const tryAndCatch = require('../../../utils/helpers/try.catch');
const { adminLoginFactory, allAdminFactory } = require('../factories/admin.factory');

exports.access = tryAndCatch(async(req, res) => {
    const { email, password } = req.body;
    const { status, message, token } = await adminLoginFactory(email, password);

    res.cookie('admin', token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 });
    res.status(status).json({ status, message });
});

exports.getAll = tryAndCatch(async(req, res) => {
    const { status, ...more } = await allAdminFactory();

    res.status(status).json({ status, ...more });
});

// exports.getOne = async(req, res, next)=> {
//     const id = req.params.id;
//     try {
//         const singleAdmin = await Admin.findById(id);
//         if(singleAdmin) {
//             return res.status(200).json({ message: 'Success', data: singleAdmin });
//         }
//         throw new Error(`Admin with id of ${ id } not found`);
//     } catch (err) {
//         res.status(404).json({ message: 'Failed', error: err.message });
//     }
//     next();
// }

// exports.edit = async(req, res, next) => {
//     const id = req.params.id;
//     const { lastName, firstName } = req.body;
//     try {
//         const modify = await Admin.findByIdAndUpdate(id, { lastName, firstName }, { new: true });
//         if(modify) {
//             if(lastName || firstName) {
//                 return res.status(200).json({ message: 'Success', data: modify });
//             }
//             throw new Error('Enter the required')
//         }
//         throw new Error(`Admin with the id ${ id } not found`);
//     } catch (err) {
//         console.log(err.message);
//         res.status(404).json({ error: err.message });
//     }
//     next();
// }