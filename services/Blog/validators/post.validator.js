const Joi = require('joi');

exports.validateCreatePost = (req, res, next) => {
    try {
        const schema = Joi.object({
            author: Joi.string().hex().length(24).required(),
            title: Joi.string().pattern(/^[A-Za-z0-9 ]+$/).required(),
            body: Joi.string().required(),
            category: Joi.string().pattern(/^[A-Za-z ]+$/),
            pics: Joi.string().allow('', null).optional(),
            isPublished: Joi.boolean().default(false).required()
        });

        const data = {
            author: req.body.author,
            title: req.body.title,
            body: req.body.body,
            category: req.body.category,
            pics: req.body.pics,
            isPublished: req.body.isPublished
        }
        
        const { error, value } = schema.validate(data);

        if(error) {
            return res.status(400).json({
                status: 400,
                error: 'V400VCP',
                message: 'Please crosscheck the provided information'
            });
        }

        req.body = value;
        next();
        
    } catch (error) {
        return res.status(500).json({ status: 500, errorcode: error.errorcode || "V500VCP", message: "An unknown error occcured", error: error });
    }
}

exports.validateUpdatePost = (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().hex().length(24).required(),
            title: Joi.string().pattern(/^[A-Za-z0-9 ]+$/),
            body: Joi.string(),
            category: Joi.string().pattern(/^[A-Za-z ]+$/),
            pics: Joi.string().allow('', null).optional(),
            isPublished: Joi.boolean().default(false)
        });

        const data = {
            id: req.params.id,
            title: req.body.title,
            body: req.body.body,
            category: req.body.category,
            pics: req.body.pics,
            isPublished: req.body.isPublished
        }
        
        const { error, value } = schema.validate(data);

        if(error) {
            return res.status(400).json({
                status: 400,
                error: 'V400VUP',
                message: 'Please crosscheck the provided information'
            });
        }

        req.body = value;
        next();
        
    } catch (error) {
        return res.status(500).json({ status: 500, errorcode: error.errorcode || "V500VUP", message: "An unknown error occcured", error: error });
    }
}

exports.validateAllPosts = (req, res, next) => {
    try {
        const schema = Joi.object({
            page: Joi.string().alphanum(),
            limit: Joi.string().alphanum(),
            title: Joi.string().pattern(/^[A-Za-z0-9 ]+$/)
        });

        const data = {
            ...req.query
        }
        
        const { error, value } = schema.validate(data);

        if(error) {
            return res.status(400).json({
                status: 400,
                error: 'V400VAP',
                message: 'Please crosscheck the provided information'
            });
        }

        req.body = value;
        next();
        
    } catch (error) {
        return res.status(500).json({ status: 500, errorcode: error.errorcode || "V500VAP", message: "An unknown error occcured", error: error });
    }
}

exports.validateSinglePost = (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().hex().length(24).required()
        });

        const data = {
            id: req.params.id
        }
        
        const { error, value } = schema.validate(data);

        if(error) {
            return res.status(400).json({
                status: 400,
                error: 'V400VSP',
                message: 'Please crosscheck the provided information'
            });
        }

        req.body = value;
        next();
        
    } catch (error) {
        return res.status(500).json({ status: 500, errorcode: error.errorcode || "V500VSP", message: "An unknown error occcured", error: error });
    }
}

exports.validatePublishPost = (req, res, next) => {
    try {
        console.log(req.body)
        const schema = Joi.object({
            id: Joi.string().hex().length(24).required(),
            isPublished: Joi.boolean().default(false).required()
        });

        const data = {
            id: req.params.id,
            isPublished: req.body.isPublished
        }
        
        const { error, value } = schema.validate(data);

        if(error) {
            return res.status(400).json({
                status: 400,
                error: 'V400VPP',
                message: 'Please crosscheck the provided information'
            });
        }

        req.body = value;
        next();
        
    } catch (error) {
        return res.status(500).json({ status: 500, errorcode: error.errorcode || "V500VPP", message: "An unknown error occcured", error: error });
    }
}