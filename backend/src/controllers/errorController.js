// handle JWT error

import { AppError } from '../utils/appError.js';

const handleJWTError = (_err) =>
  new AppError('Invalid token. Please login again', 401);

// handle JWT Expired Error

const handleJWTExpiredError = (_err) =>
  new AppError('Your token has expired! Please log in again', 401);

// Dev Error

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.statusCode,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak to the client
  } else {
    // 1) Log error
    console.error('Error ⚡', err);

    // 2) Send Generic Message
    res.status(500).json({
      status: 'error',
      message: 'Something Went very wrong',
    });
  }
};

// Global Error

export const errorController = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = err;

    if (err.name === 'JsonWebTokenError') error = handleJWTError(error);
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError(error);

    sendErrorProd(error, res);

    console.log(error);
  }
};
