const Admin = require('../model/adminModel');
const bcrypt = require("bcrypt");

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
        res.status(201).json({ message: 'Successful Created...', data: createAdmin });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}