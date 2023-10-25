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