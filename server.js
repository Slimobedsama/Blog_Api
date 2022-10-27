const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const blogRoute = require('./routes/blogRoute');
const db = require('./config/db');

const app = express();
PORT = process.env.PORT;
db()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/blogs', blogRoute);


app.listen(PORT, () => console.log(`Server on ${PORT}`));