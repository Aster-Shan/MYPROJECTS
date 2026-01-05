import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { errorCode } from '../../../config/errorCode';
import ImageQueue from '../../jobs/queues/imageQueue';
import { getUserById } from '../../services/authService';
import { checkUerIfNotExit } from '../../utils/auth';
import { checkFileExit } from '../../utils/check';
import { createError } from '../../utils/error';

interface CustomRequest extends Request {
  userId?: any;
}

export const createPost = [
  body('title', 'tite is required').trim().notEmpty().escape(),
  body('content', 'content is required').trim().notEmpty().escape(),
  body('body', 'body is required').trim().notEmpty().escape(),
  body('category', 'category is required').trim().notEmpty().escape(),
  body('type', 'type is required').trim().notEmpty().escape(),
  body('tags', 'Tag is invlid')
    .optional({ nullable: true })
    .customSanitizer((value) => {
      if (value) {
        return value.split(',').filter((tag: string) => tag.trim() !== ''); //"",tag8 ==> two tags = "" and tag8 => we dont use "", "" means "space but trim"
      }
      return value;
    }),

  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });

    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }
    const { title, content, body, category, type, tags } = req.body;

    const userId = req.userId;
    const image = req.file;
    const user = await getUserById(userId!);
    checkUerIfNotExit(user);
    checkFileExit(image);

    const splitFileName = req.file?.filename.split('.')[0];
    const job = await ImageQueue.add(
      'optimize_image',
      {
        filePath: req.file?.path,
        fileName: `${splitFileName}.webp`,
        width: 835,
        heigth: 577,
        quality: 100,
      },
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    );

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
