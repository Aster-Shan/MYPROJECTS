import { errorCode } from '../../config/errorCode';
export const checkFileExit = (file: any) => {
  if (!file) {
    const error: any = new Error('File is not existed');
    error.status = 409;
    error.code = errorCode.invalid;
    throw error;
  }
};
