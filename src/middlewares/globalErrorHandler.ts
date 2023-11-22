/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import ApiError from '../errors/ApiError';
import handleValidationError from '../errors/handleValidationError';
import handleZodError from '../errors/handleZodError';
import { IGenericerrorMessages } from '../interfaces/error';
import { errorlogger } from '../shared/logger';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.env === 'development'
    ? // eslint-disable-next-line no-console
      console.log(`globalErrorHandler`, error)
    : errorlogger.error(`globalErrorHandler`, error);

  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessagess: IGenericerrorMessages[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessagess = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessagess = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessagess = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessagess = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessagess,
    stacks: config.env !== 'production' ? error?.stack : undefined,
  });

  next();
};

export default globalErrorHandler;
