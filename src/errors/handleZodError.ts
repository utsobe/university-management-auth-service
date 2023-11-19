import { ZodError } from 'zod';

const handleZodError = (error: ZodError) => {
  // const errors =

  console.log('eta zod error', error);

  const statusCode = 400;
  // return {
  //   statusCode,
  //   message: 'Validation Error',
  //   errorMessages: errors,
  // };
};

export default handleZodError;
