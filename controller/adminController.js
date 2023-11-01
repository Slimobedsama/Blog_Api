const Admin = require('../model/adminModel');
const bcrypt = require("bcrypt");
const { adminToken } = require('../utils/genToken');

exports.getAll = async(req, res)=> {
    try {
        const allAdmin = await Admin.find();
        res.status(200).json({ message: 'Successful', data: allAdmin});
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
}

exports.create = async(req, res, next)=> {
    const { lastName, firstName, email, password } = req.body;
    try {
        const encryptedPassword = await bcrypt.hash(password, 12);
        const createAdmin = await Admin.create({
            lastName: lastName,
            firstName: firstName,
            email: email,
            password: encryptedPassword
        });
        const token = adminToken(createAdmin._id);
        res.status(201).json({ message: 'Successfully Created...', token, data: createAdmin });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}