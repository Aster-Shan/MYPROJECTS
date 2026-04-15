import { NextFunction, Request, Response } from 'express';
import { param, query, validationResult } from 'express-validator';
import { errorCode } from '../../../config/errorCode';
import { getUserById } from '../../services/authService';
import { getPostsList, getPostWithRelations } from '../../services/postService';
import { checkUserIfNotExit } from '../../utils/auth';
import { getOrSetCache } from '../../utils/cache';
import { checkModelIfExist } from '../../utils/check';
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

    const cacheKey = `posts:${JSON.stringify(postId)}`;
    const post = await getOrSetCache(cacheKey, async () => {
      return await getPostWithRelations(+postId);
    });
    checkModelIfExist(post);
    // const post = await getPostWithRelations(+postId);

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

    res.status(200).json({ message: 'Successfully get a post', post });
  },
];

//offset Pagination
export const getPostsByPagination = [
  query('page', 'Page Number must be usigned integer.').optional().isInt({
    gt: 0,
  }),
  query('limit', 'limit number mjust be unsigned number').optional().isInt({
    gt: 2,
  }),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    // const {page,limit}=req.query;
    const userId = req.userId;
    const user = await getUserById(userId!);
    checkUserIfNotExit(user);

    const skip = (+page - 1) * +limit; //if page =1 ==>1-1=0*5;
    const options = {
      skip,
      take: +limit + 1,
      select: {
        id: true,
        title: true,
        content: true,
        image: true,
        updatedAt: true,
        author: {
          select: {
            fullName: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    };

    // const posts = await getPostsList(options);
    const cacheKey = `posts:${JSON.stringify(req.query)}`;
    const posts = await getOrSetCache(cacheKey, async () => {
      return getPostsList(options);
    });

    const hasNextPage = posts.length > +limit;
    let nextPage = null;
    const previousPage = +page !== 1 ? +page - 1 : null;
    if (hasNextPage) {
      posts.pop();
      nextPage = +page + 1;
    }

    res.status(200).json({
      message: 'Successfully get all posts',
      curentPage: page,
      previousPage,
      hasNextPage,
      posts,
    });
  },
];
export const getinfinitePostsByPagination = [
  query('cursor', 'Cursor must be Post ID')
    .optional({ checkFalsy: true })
    .isInt({ gt: 0 })
    .toInt(),

  query('Limit', 'Limit number must be unsigned integer.')
    .optional()
    .isInt({ gt: 2 })
    .toInt(),

  async (req: CustomRequest, res: Response, next: NextFunction) => {
    console.log('RAW QUERY:', req.query);
    console.log('ALL ERRORS:', validationResult(req).array());
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }

    const lastCursor = req.query.cursor;
    const limit = req.query.limit || 5;

    const userId = req.userId;
    const user = await getUserById(userId!);
    checkUserIfNotExit(user);

    const options = {
      take: +limit + 1,
      skip: lastCursor ? 1 : 0,
      cursor: lastCursor ? { id: +lastCursor } : undefined,
      select: {
        id: true,
        title: true,
        content: true,
        image: true,
        updatedAt: true,
        author: {
          select: {
            fullName: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    };
    // const posts = await getPostsList(options);
    const cahceKey = `posts:${JSON.stringify(req.query)}`;
    const posts = await getOrSetCache(cahceKey, async () => {
      return await getPostsList(options);
    });

    const hasNextPage = posts.length > +limit; // limit is 5 but +1 so total 6

    if (hasNextPage) {
      posts.pop();
    }
    const nextCursor = posts.length > 0 ? posts[posts.length - 1].id : null;

    res.status(200).json({
      message: 'Get all Infinite posts',
      hasNextPage,
      nextCursor,
      prevCursor: lastCursor,
      posts,
    });
  },
];
