import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericerrorMessages } from '../interfaces/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const error: IGenericerrorMessages[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el.path,
        message: el.message,
      };
    },
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: error,
  };
};

export default handleValidationError;
