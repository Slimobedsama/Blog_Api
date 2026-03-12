const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const logger = require('./logger');
const adminRoute = require('./services/Auth/routes/admin.route');
const postRoute = require('./services/Blog/routes/post.route');
const userRoute = require('./services/Auth/routes/user.route');
const commentRoute = require('./services/Comment/routes/commentRoute');
const { logicErrorHandler, imageError } = require('./utils/middleware/errorHandling');

const morganFormat = ":method :url :status :response-time ms";

PORT = process.env.PORT;
// PARSES JSON DATA
app.use(express.json());
// PARSES ENCONDED URL DATA
app.use(express.urlencoded({extended: true}));
/* PUBLIC DIR MIDDLEWARE 
THE FIRST PARAMETER MUST BE THE SAME PATH WITH THE PATH ON THE IMAGE URL
*/
app.use(express.static('public'));
//MIDDLEWARE FOR DATA LOGGER
app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  );
app.use(cookieParser());

app.use('/api/admin', adminRoute);
app.use('/api/post', postRoute);
app.use('/api/user', userRoute);
app.use('/api/comment', commentRoute);

// ERROR HANDLING MIDDLEWARE
app.use(imageError);
app.use(logicErrorHandler);

module.exports = app;