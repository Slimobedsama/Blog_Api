const Joi = require('joi');
const logger = require('../../../logger');

exports.validateAdninLogin = (req, res, next) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(/^[A-Za-z0-9!@#$%^&*()_+\-=]+$/).min(6).required()
        });
    
        const data = {
            email: req.body.email,
            password: req.body.password
        }
    
        const { error, value } = schema.validate(data);
    
        if(error) {
            return res.status(400).json({
                status: 400,
                errorCode: 'V400VAL',
                message: 'Please crosscheck the provided information'
            })
        }
    
        req.body = value;
        next();
        
    } catch (error) {
        // console.log(error)
        logger.error({error})
        return res.status(500).json({ status: 500, errorcode: error.errorcode || "V500VAL", message: "An unknown error occcured", error: error });
    }
}