const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const db = require('./config/db');

const app = express();
PORT = process.env.PORT;
db()



app.listen(PORT, () => console.log(`Server on ${PORT}`));