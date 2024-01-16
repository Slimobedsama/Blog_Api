const { body, validationResult } = require('express-validator');
const Admin = require('../model/adminModel');
const User = require('../model/userModel')
const Blog = require('../model/blogModel');

// ADMIN VALIDATIONS BELOW
const adminValidateSignup = 
[
    body('lastName').notEmpty().withMessage('Enter Last Name'),
    body('firstName').notEmpty().withMessage('Enter First Name'),
    body('email').isEmail().withMessage('Enter A valid email address').custom( async value=> {
        const checkEmail = await Admin.findOne({ email: value });
        if (checkEmail) throw new Error("This Email is already in use");
    }),
    body('password').isStrongPassword({ minLength: 6, minSymbols: 0 }).withMessage('Password must be a minimum of 6 characters and a combination of at least 1 of uppercase and lowercase'),
    (req, res, next)=> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array().map(err=> err.msg) });
        return next();
    }
];

const adminEditValidation = 
[
    body('lastName').notEmpty().withMessage('Enter Last Name'),
    body('firstName').notEmpty().withMessage('Enter First Name'),
    (req, res, next)=> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array().map(err=> err.msg) });
        return next();
    }
];

// USER VALIDATION BELOW
const userValidateSignup = 
[
    body('firstName').notEmpty().withMessage('Enter First Name'),
    body('lastName').notEmpty().withMessage('Enter Last Name'),
    body('userName').notEmpty().withMessage('Enter A username').custom( async value=> {
        const checkUsername = await User.findOne({ userName: value });
        if (checkUsername) throw new Error("This username is already in use");
    }),
    body('email').isEmail().withMessage('Enter A valid email address').custom( async value=> {
        const checkEmail = await User.findOne({ email: value });
        if (checkEmail) throw new Error("This email is already in use");
    }),
    body('password').isStrongPassword({ minLength: 6, minSymbols: 0 }).withMessage('Password must be a minimum of 6 characters and a combination of at least 1 of uppercase and lowercase'),
    (req, res, next)=> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array().map(err=> err.msg) });
        return next();
    }
];
const userUpdateValidation = 
[
    body('firstName').notEmpty().withMessage('Enter First Name'),
    body('lastName').notEmpty().withMessage('Enter Last Name'),
    body('userName').notEmpty().withMessage('Enter A username'),
    (req, res, next)=> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array().map(err=> err.msg) });
        return next();
    }  
];

const resetUserPassVal = 
[
    body('password').isStrongPassword({ minLength: 6, minSymbols: 0 }).withMessage('Password must be a minimum of 6 characters and a combination of at least 1 of uppercase and lowercase'),
    (req, res, next)=> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array().map(err=> err.msg) });
        return next();
    }
]

// BLOG VALIDATIONS BELOW
const blogValidation = 
[
    body('author').trim().exists({ checkFalsy: true }).withMessage('Author Name Is Required'),
    body('title').trim().notEmpty().withMessage('Title Is Required'),
    body('body').trim().notEmpty().withMessage('Body Is Required'),
    (req, res, next)=> {
        const errors = validationResult(req);
        if(!errors.isEmpty()) { 
            console.log(errors.array().map(err=> err.msg))
            return res.status(400).json({ errors: errors.array().map(err=> err.msg) });
        }
        return next();
    }
]

// PASSWORD RESET VALIDATION
const resetPassValidate = 
[
    body('password').isStrongPassword({ minLength: 6, minSymbols: 0 }).withMessage('Password Must Be A Minimum Of 6 Characters, 1 Uppercase, 1 Lowercase & 1 Number'),
    (req, res, next)=> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map( error => error.msg) });
        }
        return next();
    }
];

module.exports = { 
    adminValidateSignup, 
    adminEditValidation,
    userValidateSignup,
    userUpdateValidation,
    blogValidation,
    resetPassValidate
};