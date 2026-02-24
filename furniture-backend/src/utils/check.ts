import { errorCode } from '../../config/errorCode';
export const checkFileExit = (file: any) => {
  if (!file) {
    const error: any = new Error('File is not existed');
    error.status = 409;
    error.code = errorCode.invalid;
    throw error;
  }
};
export const checkModelIfExist = (model: any) => {
  if (!model) {
    const error: any = new Error('This model does not exist.');
    error.status = 409;
    error.code = errorCode.invalid;
    throw error;
  }
};
