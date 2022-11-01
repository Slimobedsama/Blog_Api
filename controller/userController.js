const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const genToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.EXPIRES_IN});
}

exports.allUsers = async(req, res) => {
    try {
        const users = await User.find().sort({firstName: 'asc'});
        res.json(users);
    } catch (err) {
      res.status(500).json({msg: 'Server error'});  
    }
}

exports.signup = async(req, res) => {
    const {firstName, lastName, userName, phoneNo, email, password} = req.body;
    try {
        const foundEmail = await User.findOne({email});
        if(foundEmail) {
            return res.json({msg: 'Email already exist'});
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            phoneNo: req.body.phoneNo,
            email: req.body.email,
            password: hashPassword
        });
        const token = genToken(newUser._id);
        res.status(201).json({msg: 'Successful registration', token, newUser});
    } catch (err) {
        res.status(400).json({msg: 'Bad request'});
    }
}

exports.login = async(req, res) => {
    const {email, userName, password} = req.body;
   try {
    const foundEmail = await User.findOne({email});
    const foundUsername = await User.findOne({userName})
    const checkUser = foundEmail || foundUsername
    if(checkUser) {
       const checkPassword = await bcrypt.compare(password, checkUser.password);
        if(checkPassword) {
            const token = genToken(checkUser._id)
            return res.status(200).json({msg: 'Login successfully', token, data: checkUser});
        }
        return res.status(400).json({msg: 'Invalid password'});
    }
    return res.status(400).json({msg: 'Invalid email or username'});
   } catch (err) {
    return res.status(400).json({msg: 'User does not exist'});
   }
}