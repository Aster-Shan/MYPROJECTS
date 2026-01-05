import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { errorCode } from '../../../config/errorCode';
import { createError } from '../../utils/error';

interface CustomRequest extends Request {
  user?: any;
}
export const createPost = [
  body(),

  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });

    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }
    const { phone, password, token } = req.body;

    res.status(200).json({ message: 'Sucessfully created Post' });
  },
];
export const updatePost = [
  body(),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }
    const { phone, password, token } = req.body;
    res.status(200).json({ message: 'Successfully updated' });
  },
];
export const deletePost = [
  body(),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }
    const { phone, password, token } = req.body;
    res.status(200).json({ message: 'Successfully deleted' });
  },
];
