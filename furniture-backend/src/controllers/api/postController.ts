import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { errorCode } from '../../../config/errorCode';
import { createError } from '../../utils/error';

export const getPost = [
  body(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }
    const { phone, password, token } = req.body;
    res.status(200).json({ message: 'Successfully get post' });
  },
];
export const getPostsByPagination = [
  body(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }
    const { phone, password, token } = req.body;
    res.status(200).json({ message: 'Successfully get all posts' });
  },
];
