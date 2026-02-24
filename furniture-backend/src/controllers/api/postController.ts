import { NextFunction, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import { errorCode } from '../../../config/errorCode';
import { getUserById } from '../../services/authService';
import { getPostWithRelations } from '../../services/postService';
import { checkUserIfNotExit } from '../../utils/auth';
import { createError } from '../../utils/error';

interface CustomRequest extends Request {
  userId?: number;
}
export const getPost = [
  param('id', 'Post ID is required.').isInt({ gt: 0 }),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }
    const postId = req.params.id;
    const userId = req.userId;
    const user = await getUserById(userId!);
    checkUserIfNotExit(user);

    const post = await getPostWithRelations(+postId);

    // const modifiedPost = {
    //   id: post!.id,
    //   title: post?.title,
    //   content: post?.content,
    //   body: post?.body,
    //   image: '/optimize/' + post?.image.split('.')[0] + '.webp',
    //   updatedAt: post?.updatedAt.toLocaleDateString('en-Us', {
    //     year: 'numeric',
    //     month: 'long',
    //     day: 'numeric',
    //   }),
    //   fullName:
    //     (post?.author.firstName ?? '') + '' + (post?.author.lastName ?? ''),
    //   category: post?.category.name,
    //   type: post?.type.name,
    //   tag:
    //     post?.tags && post?.tags.length > 0
    //       ? post.tags.map((i) => i.name)
    //       : null,
    // };

    res.status(200).json({ message: 'Successfully get post', post });
  },
];
export const getPostsByPagination = [
  body(),
  (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }
    const { phone, password, token } = req.body;
    res.status(200).json({ message: 'Successfully get all posts' });
  },
];
export const getinfinitePostsByPagination = [
  body(),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }
    const { phone, password, token } = req.body;
    res.status(200).json({ message: 'OK' });
  },
];
