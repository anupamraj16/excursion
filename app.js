const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// GLOBAL MIDDLEWARES

// Body-Parser
app.use(express.json());

// Request Logger During Development
if (process.env.NODE_ENV === 'development') {
  // reading of environment variables is done in server.js
  // but we can access process.env anywhere because it is available everywhere
  app.use(morgan('dev'));
}

// Serve Static Files
app.use(express.static(`${__dirname}/public`));
// serves static files in public folder
// if a URL is not handled by any route handler, it goes to public folder

// Mount Routes

app.use('/api/v1/tours', tourRouter); // app.use is used to mount a middleware
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
