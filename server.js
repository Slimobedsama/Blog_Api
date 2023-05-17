const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
const blogRoute = require('./routes/blogRoute');
const userRoute = require('./routes/userRoute');
const db = require('./config/db');

const app = express();
PORT = process.env.PORT;
db()
// PARSES JSON DATA
app.use(express.json());
// PARSES ENCONDED URL DATA
app.use(express.urlencoded({extended: true}));
//MIDDLEWARE FOR DATA LOGGER
app.use(morgan('dev'));

app.use('/api/blogs', blogRoute);
app.use('/api/user', userRoute);


app.listen(PORT, () => console.log(`Server on ${PORT}`));