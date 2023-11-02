const Admin = require('../model/adminModel');
const bcrypt = require("bcrypt");
const { adminToken } = require('../utils/genToken');

exports.getAll = async(req, res, next)=> {
    try {
        const allAdmin = await Admin.find();
        res.status(200).json({ message: 'Successful', data: allAdmin});
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
    next();
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
    next();
}

exports.access = async(req, res, next)=> {
    const { email, password } = req.body;
    try {
        const checkEmail = await Admin.findOne({ email });
        if(checkEmail) {
            const CheckPassword = await bcrypt.compare(password, checkEmail.password);
            if(CheckPassword) {
                const token = adminToken(Admin._id);
                return res.status(200).json({ message: 'Success', status: 'Logged In', token, data: checkEmail._id });
            }
            throw new Error('Incorrect Password');
        }
        throw new Error('Email Not Found');
    } catch (err) {
        res.status(404).json({ status: 'Failed', error: err.message });
    }
    next();
}

exports.edit = async(req, res, next)=> {
    const id = req.params.id;
    const { lastName, firstName } = req.body;
    try {
        const modify = await Admin.findByIdAndUpdate(id, { lastName, firstName }, { new: true });
        if(modify) {
            if(lastName || firstName) {
                return res.status(200).json({ message: 'Success', data: modify });
            }
            throw new Error('Enter the required')
        }
        throw new Error(`Admin with the id ${ id } not found`);
    } catch (err) {
        console.log(err.message);
        res.status(404).json({ error: err.message });
    }
    next();
}