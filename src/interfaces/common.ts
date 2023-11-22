import { IGenericerrorMessages } from './error';

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericerrorMessages[];
};
