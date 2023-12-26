const Admin = require('../model/adminModel');
const bcrypt = require("bcrypt");
const { adminToken } = require('../utils/genToken');
const emailer = require('../utils/mail');

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
        const option = {
            from: process.env.USER,
            to: newUser.email,
            subject: 'Email Verification',
            html: `<h3>Hello! ${ firstName } please verify your email with this link <a href="http://localhost:7000/api/blogs">${token}</a></h3>`,
        }
        await emailer(option);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 });
        res.status(201).json({ message: 'Successfully Created...', token, data: createAdmin });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
    next();
}

exports.getOne = async(req, res, next)=> {
    const id = req.params.id;
    try {
        const singleAdmin = await Admin.findById(id);
        if(singleAdmin) {
            return res.status(200).json({ message: 'Success', data: singleAdmin });
        }
        throw new Error(`Admin with id of ${ id } not found`);
    } catch (err) {
        res.status(404).json({ message: 'Failed', error: err.message });
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