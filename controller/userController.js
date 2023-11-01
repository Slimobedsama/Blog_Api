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
    const {firstName, lastName, userName, phoneNo, email, password} = req.body;
    try {
        // USER VALIDATIONS
        const foundEmail = await User.findOne({email});
        if(foundEmail) {
            return res.json({msg: 'Email already exist'});
        } else if(validator.isEmpty(firstName)) {
            throw new Error('First Name is Required');
        } else if(validator.isEmpty(lastName)) {
            throw new Error('Last Name is Required');
        } else if(validator.isEmpty(userName)) {
            throw new Error('Username is Required');
        } else if(validator.isEmpty(firstName)) {
            throw new Error('First Name is Required');
        } else if(!validator.isMobilePhone(phoneNo, ['en-NG', 'en-GB'])) {
            throw new Error('Enter A Valid Mobile Number');
        } else if(!validator.isEmail(email)) {
            throw new Error('Enter A Valid Email Address');
        } else if(validator.isEmpty(firstName)) {
            throw new Error('First Name is Required');
        } else if(!validator.isStrongPassword(password, {minLength: 6, minSymbols: 0})) {
            throw new Error('A Minimum Of 6 Characters With At Least 1 Uppercase, 1 Lowercase & 1 Number');
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            phoneNo: req.body.phoneNo,
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