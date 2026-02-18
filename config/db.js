const mongoose = require('mongoose');
const logger = require('../logger');

const db = async() => {
    try {
        mongoose.set("strictQuery", true);
        mongoose.connect(process.env.DBURI, { useNewUrlParser: true, useUnifiedTopology: true }) 
        logger.info('Database Connection Successful')
    } catch (error) {
        logger.error(error)
    }
}

module.exports = db;