import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { unlink } from 'node:fs/promises';
import path from 'path';
import { errorCode } from '../../../config/errorCode';
import cacheQueue from '../../jobs/queues/cacheQueue';
import ImageQueue from '../../jobs/queues/imageQueue';
import { createOneProduct } from '../../services/productService';
import { checkFileExit } from '../../utils/check';
import { createError } from '../../utils/error';
interface CustomRequest extends Request {
  userId?: number;
  user?: any;
  files?: any;
}
const removeFiles = async (
  originalFiles: string[],
  optimizedFiles: string[] | null,
) => {
  try {
    for (const originalFile of originalFiles) {
      const originalFilePath = path.join(
        __dirname,
        '../../..',
        '/uploads/images',
        originalFile,
      );
      await unlink(originalFilePath);
    }

    if (optimizedFiles) {
      for (const optimizedFile of optimizedFiles) {
        const optimizedFilePath = path.join(
          __dirname,
          '../../..',
          '/uploads/optimize',
          optimizedFile,
        );

        await unlink(optimizedFilePath);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = [
  body('name', 'Name is required').trim().notEmpty().escape(),
  body('description', 'Description is required').trim().notEmpty().escape(),
  body('price', 'Price is required')
    .isFloat({ min: 0.1 })
    .isDecimal({ decimal_digits: '1,2' }),
  body('discount', 'Discount is required')
    .isFloat({ min: 0 })
    .isDecimal({ decimal_digits: '1,2' }),
  body('inventory', 'Inventory is required').isInt({ min: 1 }),
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
      if (req.files && req.files.length > 0) {
        const originalFiles = req.files.map((file: any) => file.filename);
        await removeFiles(originalFiles, null);
      }
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }
    const {
      name,
      description,
      price,
      discount,
      inventory,
      category,
      type,
      tags,
    } = req.body;

    checkFileExit(req.files && req.files.length > 0);

    await Promise.all(
      req.files.map(async (file: any) => {
        const splitFileName = file.filename.split('.')[0];
        return ImageQueue.add(
          'optimize_image',
          {
            filePath: file.path,
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
      }),
    );
    const originalFileNames = req.files.map((file: any) => ({
      path: file.filename,
    }));

    const data: any = {
      name,
      description,
      price,
      discount,
      inventory: +inventory,
      category,
      type,
      tags,
      images: originalFileNames,
    };
    const product = await createOneProduct(data);
    //add queue to delete cacahe after creating a post
    await cacheQueue.add(
      'invalidate-product-cache',
      {
        //pattern means which parts to be deleted
        pattern: 'product:*',
      },
      {
        jobId: `invalidate-${Date.now()}`,
        priority: 1,
      },
    );
    res.status(201).json({
      message: 'Sucessfully created new product.',
      productId: product.id,
    });
  },
];

export const updateProduct = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};

export const deleteProduct = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};
