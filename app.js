const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const adminRoute = require('./routes/adminRoute');
const blogRoute = require('./routes/blogRoute');
const userRoute = require('./routes/userRoute');
const commentRoute = require('./routes/commentRoute');
const imageError = require('./middleware/errorHandling');

PORT = process.env.PORT;
// PARSES JSON DATA
app.use(express.json());
// PARSES ENCONDED URL DATA
app.use(express.urlencoded({extended: true}));
/* PUBLIC DIR MIDDLEWARE 
THE FIRST PARAMETER MUST BE THE SAME PATH WITH THE PATH ON THE IMAGE URL
*/
app.use('/images', express.static('public/upload'));
//MIDDLEWARE FOR DATA LOGGER
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api/admin', adminRoute);
app.use('/api/blogs', blogRoute);
app.use('/api/user', userRoute);
app.use('/api/comment', commentRoute);

// ERROR HANDLING MIDDLEWARE
app.use(imageError);

module.exports = app;