const mongoose = require('mongoose');

const db = () => {
    mongoose.connect(process.env.DBURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log('Database connected'))
    .catch((err) => console.log(err))    
}

module.exports = db;