const { body, validationResult } = require('express-validator');
const Admin = require('../model/adminModel');
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

// BLOG VALIDATIONS BELOW
const createBlogValidation = 
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

module.exports = { 
    adminValidateSignup, 
    adminEditValidation, 
    createBlogValidation 
};