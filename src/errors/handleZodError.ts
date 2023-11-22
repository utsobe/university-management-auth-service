import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericerrorMessages } from '../interfaces/error';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericerrorMessages[] = error.issues.map(
    (issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue?.message,
      };
    },
  );

  console.log(
    'eta zod error',
    error.issues.map(issue => issue.path),
  );

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleZodError;
