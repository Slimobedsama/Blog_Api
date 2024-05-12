const app = require('./app');
const server = require('node:http').createServer(app);

const db = require('./config/db');

db().then((result)=> app.listen(PORT, () => console.log(`Server on ${PORT}`)))
.catch((err)=> console.log(err));