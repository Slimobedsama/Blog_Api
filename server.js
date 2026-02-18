const app = require('./app');
const server = require('node:http').createServer(app);
const logger = require('./logger');

const db = require('./config/db');

db().then((result)=> app.listen(PORT, () => logger.info(`Server on ${PORT}`)))
.catch((err)=> logger.error(err));