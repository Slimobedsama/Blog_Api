const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { userToken } = require('../utils/genToken');

exports.allUsers = async(req, res, next) => {
    try {
        const users = await User.find().sort({firstName: 'asc'});
        res.status(200).json(users);
    } catch (err) {
      res.status(500).json({message: 'Server error'});  
    }
    next();
}

exports.signup = async(req, res, next) => {
    const {firstName, lastName, userName, email, password} = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: hashPassword
        });
        const token = userToken(newUser._id);
        res.status(201).json({message: 'Successful Registration', token, Users: newUser._id});
    } catch (err) {
        res.status(400).json({errors: err.message});
    }
    next()
}

exports.login = async(req, res, next) => {
    const {email, userName, password} = req.body;
   try {
    const foundEmail = await User.findOne({email});
    const foundUsername = await User.findOne({userName})
    const checkUser = foundEmail || foundUsername
    if(checkUser) {
       const checkPassword = await bcrypt.compare(password, checkUser.password);
        if(checkPassword) {
            const token = userToken(checkUser._id)
            return res.status(200).json({msg: 'Login successfully', token, data: checkUser});
        }
        return res.status(400).json({msg: 'Invalid password'});
    }
    return res.status(400).json({msg: 'Invalid email or username'});
   } catch (err) {
        res.status(400).json({msg: 'User does not exist'});
   }
   next();
}

exports.getSingleUser = async(req, res, next) => {
    const id = req.params.id
    try {
        const oneUser = await User.findById(id);
        res.status(200).json({msg: `Requested user with the id ${id} found`, data: oneUser});
    } catch (err) {
        res.status(400).json({msg: `User with the id ${id} does not exist.`});
    }
    next();
}

exports.updateUser = async(req, res, next) => {
    const id = req.params.id;
    const {firstName, lastName, userName, phoneNo} = req.body;
    try {
        if(!firstName || !lastName || !userName || !phoneNo) {
            return res.json({msg: 'Update the required details'})
        } else {
            const updateData = await User.findByIdAndUpdate(id);
            return res.status(200).json({msg: 'Update Successful', updateData});
        }
    } catch (err) {
        res.status(400).json({msg: 'Bad Request'});
    }
    next();
}