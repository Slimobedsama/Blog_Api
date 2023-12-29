const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const { userToken, resetToken } = require('../utils/genToken');
const emailer = require('../utils/mail');

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
        let option = {
            from: process.env.USER,
            to: newUser.email,
            subject: 'Email Verification',
            html: `<h3>Hello! ${ firstName } please verify your email with this link <a href="http://localhost:7000/api/blogs">${token}</a></h3>`,
        }
        await emailer(option);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 });
        res.status(201).json({status: 'Successful Registration', message: 'Check Your Email For Confirmation', token, Users: newUser._id});
    } catch (err) {
        res.status(400).json({errors: err.message});
    }
    next()
}

exports.login = async(req, res, next) => {
    const {email, password} = req.body;
   try {
    const foundEmail = await User.findOne({email});
    if(foundEmail) {
       const checkPassword = await bcrypt.compare(password, foundEmail.password);
        if(checkPassword) {
            const token = userToken(foundEmail._id)
            return res.status(200).json({message: 'Login successfully', token, data: foundEmail._id});
        }
        throw new Error('Wrong Password');
    }
    throw new Error('Email Not Found');
   } catch (err) {
        res.status(400).json({errors: err.message});
   }
   next();
}

exports.getSingleUser = async(req, res, next) => {
    const id = req.params.id
    try {
        const oneUser = await User.findById(id);
        if(!oneUser) {
            throw new Error(`User with the id ${id} does not exist.`)
        }
        res.status(200).json({msg: `Requested user with the id ${id} found`, data: oneUser});
    } catch (err) {
        res.status(404).json({msg: err.message});
    }
    next();
}

exports.updateUser = async(req, res, next) => {
    const id = req.params.id;
    const { firstName, lastName, userName } = req.body;
    try {
        const editData = await User.findByIdAndUpdate(id, { firstName, lastName, userName }, { new: true });
        if(editData) {
            return res.status(200).json({ message: 'Success', status: 'Updated', data: editData });
        }
        throw new Error(`User with id ${ id } not found`)
    } catch (err) {
        res.status(400).json({errors: err.message});
    }
    next();
}
// FORGOTTEN & RESET PASSWORD LOGIC
/*
    1.CREATE A ROUTE FOR FORGOTTEN PASSWORD
    2.CHECK FOR EXISTENCE OF EMAIL IN DB
    3.GENERATE TOKEN
    4.RESPONSE
    5.CREATE ROUTE FOR RESET PASSWORD
    6.CHECK FOR EMAIL IN DB
    7.CREATE PASSWORD AND HASH PASSWORD
    8.RESPONSE
  */
exports.lost = async(req, res, next)=> {
    const { email } = req.body;
    try {
        const checkEmail = await User.findOne({ email });
        if(!checkEmail) throw new Error('Email Not Found');
        const token = resetToken(checkEmail.email);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 5 * 60 * 100 });
        let option = {
            from: process.env.USER,
            to: newUser.email,
            subject: 'Password Reset Link',
            html: `<h3> Please Click On The Link For Password Reset <a href="http://localhost:7000/api/user/reset-password">${token}</a></h3>`,
        }
        await emailer(option);
        return res.status(200).json({ message: 'Success' });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
    next()
}
exports.retrieve = async(req, res, next)=> {
    const id = req.params.id;
    const { password } = req.body;
    try {
        const foundId = await User.findOne({ id });
        const hashingPassword = await bcrypt.hash(password, 12);
         foundId.password = hashingPassword;
         foundId.save();
        return res.status(201).json({ message: 'Password Reset Successful' });
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message });
    }
    next()
}