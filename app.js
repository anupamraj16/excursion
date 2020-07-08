const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  // reading of environment variables is done in server.js
  // but we can access process.env anywhere because it is available everywhere
  app.use(morgan('dev'));
}

app.use(express.json()); // parses the request body

app.use(express.static(`${__dirname}/public`));
// serves static files in public folder
// if a URL is not handled by any route handler, it goes to public folder

// 2) Mounting ROUTES
app.use('/api/v1/tours', tourRouter); // app.use is used to mount a middleware
app.use('/api/v1/users', userRouter);

module.exports = app;
