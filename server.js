const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const db = require('./config/db');
const morgan = require('morgan');
const adminRoute = require('./routes/adminRoute');
const blogRoute = require('./routes/blogRoute');
const userRoute = require('./routes/userRoute');
const commentRoute = require('./routes/commentRoute');

const app = express();
PORT = process.env.PORT;
// PARSES JSON DATA
app.use(express.json());
// PARSES ENCONDED URL DATA
app.use(express.urlencoded({extended: true}));
//MIDDLEWARE FOR DATA LOGGER
app.use(morgan('dev'));

app.use('/api/admin', adminRoute);
app.use('/api/blogs', blogRoute);
app.use('/api/user', userRoute);
app.use('/api/comment', commentRoute);

db().then((result)=> app.listen(PORT, () => console.log(`Server on ${PORT}`)))
.catch((err)=> console.log(err));