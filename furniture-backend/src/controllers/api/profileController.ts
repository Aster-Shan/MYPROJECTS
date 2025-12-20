import { NextFunction, Request, Response } from 'express';
import { query, validationResult } from 'express-validator';
import { errorCode } from '../../../config/errorCode';
interface CustomResquest extends Request {
  userId?: number;
}
export const changeLanguage = [
  query('lng', 'invalid Langauge code.')
    .trim()
    .notEmpty()
    .matches('^[a-z]+$')
    .isLength({ min: 2, max: 3 }),
  (req: CustomResquest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      const error: any = new Error(errors[0].msg);
      error.status = 400;
      error.code = errorCode.invalid;
      return next(error);
    }
  },
];
