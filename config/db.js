const mongoose = require('mongoose');

const db = async() => {
    try {
        mongoose.set("strictQuery", true);
        mongoose.connect(process.env.DBURI, { useNewUrlParser: true, useUnifiedTopology: true }) 
        console.log('Database Connection Successful')
    } catch (error) {
        console.log(error)
    }
}

module.exports = db;