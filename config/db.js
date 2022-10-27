const mongoose = require('mongoose');

const db = () => {
    const database = process.env.DBURI;
    mongoose.connect(database, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log('Database connected'))
    .catch((err) => console.log(err))    
}

module.exports = db;