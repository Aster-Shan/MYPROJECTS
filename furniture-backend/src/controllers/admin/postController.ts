import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { unlink } from 'node:fs/promises';
import path from 'path';
import sanitizeHtml from 'sanitize-html';
import { errorCode } from '../../../config/errorCode';
import cacheQueue from '../../jobs/queues/cacheQueue';
import ImageQueue from '../../jobs/queues/imageQueue';
import { getUserById } from '../../services/authService';
import {
  createOnePost,
  deleteOnePost,
  getPostById,
  PostArgs,
} from '../../services/postService';
import { checkFileExit, checkModelIfExist } from '../../utils/check';
import { createError } from '../../utils/error';

interface CustomRequest extends Request {
  userId?: number;
  user?: any;
}

const removeFiles = async (
  originalFile: string,
  optimizedFile: string | null,
) => {
  try {
    const originalFilePath = path.join(
      __dirname,
      '../../..',
      '/uploads/images',
      originalFile,
    );

    await unlink(originalFilePath);

    if (optimizedFile) {
      const optimizedFilePath = path.join(
        __dirname,
        '../../..',
        '/uploads/optimize',
        optimizedFile,
      );

      await unlink(optimizedFilePath);
    }
  } catch (error) {
    console.log(error);
  }
};
export const createPost = [
  body('title', 'tite is required').trim().notEmpty().escape(),
  body('content', 'content is required').trim().notEmpty().escape(),
  body('body', 'body is required')
    .trim()
    .notEmpty()
    .customSanitizer((value) => sanitizeHtml(value))
    .notEmpty(),
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
      if (req.file) {
        await removeFiles(req.file.filename, null);
      }
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }
    const { title, content, body, category, type, tags } = req.body;
    const userId = req.userId;
    checkFileExit(req.file);

    const user = await getUserById(userId!);
    if (!user) {
      if (req.file) {
        await removeFiles(req.file.filename, null);
      }
      return next(
        createError(
          'This Phone Number is not registered',
          409,
          errorCode.unauthenticated,
        ),
      );
    }

    const splitFileName = req.file?.filename.split('.')[0];
    await ImageQueue.add(
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

    const data: PostArgs = {
      title,
      content,
      body,
      image: req.file!.filename,
      authorId: user!.id,
      category,
      type,
      tags,
    };
    const post = await createOnePost(data);
    //add queue to delete cacahe after creating a post
    await cacheQueue.add(
      'invalidate-post-cache',
      {
        //pattern means which parts to be deleted
        pattern: 'posts:*',
      },
      {
        jobId: `invalidate-${Date.now()}`,
        priority: 1,
      },
    );
    res
      .status(201)
      .json({ message: 'Sucessfully created new Post.', postId: post.id });
  },
];
export const updatePost = [
  body('postId', 'id is required').trim().notEmpty().isInt({ min: 1 }),
  body('title', 'tite is required').trim().notEmpty().escape(),
  body('content', 'content is required').trim().notEmpty().escape(),
  body('body', 'body is required')
    .trim()
    .notEmpty()
    .customSanitizer((value) => sanitizeHtml(value))
    .notEmpty(),
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
      if (req.file) {
        await removeFiles(req.file.filename, null);
      }
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }
    const { postId, title, content, body, category, type, tags } = req.body;
    const userId = req.userId;
    //checkFileExit(req.file);

    const user = await getUserById(userId!);
    // if (!user) {
    //   if (req.file) {
    //     await removeFiles(req.file.filename, null);
    //   }
    //   return next(
    //     createError(
    //       'This Phone Number is not registered',
    //       409,
    //       errorCode.unauthenticated,
    //     ),
    //   );
    // }
    //admin

    const post = await getPostById(+postId); // post id from user is string "8".so need to change to number

    await cacheQueue.add(
      'invalidate-post-cache',
      {
        //pattern means which parts to be deleted
        pattern: 'posts:*',
      },
      {
        jobId: `invalidate-${Date.now()}`,
        priority: 1,
      },
    );
    if (!post) {
      if (req.file) {
        await removeFiles(req.file.filename, null);
      }
      return next(
        createError('This data is not existed', 401, errorCode.invalid),
      );
    }

    res.status(200).json({ message: 'Successfully updated' });
  },
];
export const deletePost = [
  body('postId', 'Post Id is required.').isInt({ gt: 0 }),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    // If validation error occurs
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }

    const { postId } = req.body;

    const userId = req.userId;
    const user = await getUserById(userId!);
    checkUserIfNotExist(user);

    const post = await getPostById(+postId);
    checkModelIfExist(post);

    if (user!.id !== post!.authorId) {
      return next(
        createError('This action is not allowed.', 403, errorCode.unauthorised),
      );
    }

    const postDeleted = await deleteOnePost(post!.id);
    const optimizedFile = post!.image.split('.')[0] + '.webp';
    await removeFiles(post!.image, optimizedFile);
    await cacheQueue.add(
      'invalidate-post-cache',
      {
        //pattern means which parts to be deleted
        pattern: 'posts:*',
      },
      {
        jobId: `invalidate-${Date.now()}`,
        priority: 1,
      },
    );

    res.status(200).json({
      message: 'Successfully deleted the post.',
      postId: postDeleted.id,
    });
  },
];

function checkUserIfNotExist(
  user: {
    status: import('../../../generated/prisma').$Enums.Status;
    id: number;
    firstName: string | null;
    lastName: string | null;
    phone: string;
    password: string;
    email: string | null;
    role: import('../../../generated/prisma').$Enums.Role;
    lastLogin: Date | null;
    errorLoginCount: number;
    randToken: string;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
  } | null,
) {
  throw new Error('Function not implemented.');
}
