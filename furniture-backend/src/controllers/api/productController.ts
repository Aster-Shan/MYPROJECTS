import { NextFunction, Request, Response } from 'express';
import { param, query, validationResult } from 'express-validator';
import { errorCode } from '../../../config/errorCode';
import { getUserById } from '../../services/authService';
import {
  getProductsList,
  getProductWithRelations,
} from '../../services/productService';
import { checkUserIfNotExit } from '../../utils/auth';
import { getOrSetCache } from '../../utils/cache';
import { checkModelIfExist } from '../../utils/check';
import { createError } from '../../utils/error';

interface CustomRequest extends Request {
  userId?: number;
}

export const getProduct = [
  param('id', 'Product ID is required.').isInt({ gt: 0 }),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }
    const productId = req.params.id;
    const userId = req.userId;
    const user = await getUserById(userId!);
    checkUserIfNotExit(user);

    const cacheKey = `products:${JSON.stringify(productId)}`;
    const product = await getOrSetCache(cacheKey, async () => {
      return await getProductWithRelations(+productId);
    });
    checkModelIfExist(product);

    res.status(200).json({ message: 'Successfully get a post', product });
  },
];

export const getProductsByPagination = [
  query('cursor', 'Cursor must be Post ID').isInt({ gt: 0 }).optional(),

  query('Limit', 'Limit number must be unsigned integar.')
    .isInt({ gt: 4 })
    .optional(),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }

    const lastCursor = req.query.cursor;
    const limit = req.query.limit || 5;
    const category = req.query.category;
    const type = req.query.type;

    const userId = req.userId;
    const user = await getUserById(userId!);
    checkUserIfNotExit(user);

    let categoryList: number[] = [];
    let typeList: number[] = [];

    if (category) {
      categoryList = category
        .toString()
        .split(',')
        .map((c) => Number(c))
        .filter((c) => c > 0);
    }

    if (type) {
      typeList = type
        .toString()
        .split(',')
        .map((t) => Number(t))
        .filter((t) => t > 0);
    }

    const where = {
      AND: [
        categoryList.length > 0 ? { categoryId: { in: categoryList } } : {}, //in=> categoryList htl ka hr ko pya
        typeList.length > 0 ? { typeId: { in: typeList } } : {}, //in=> typeList htl ka hr ko pya
      ],
    };
    const options = {
      where,
      take: +limit + 1,
      skip: lastCursor ? 1 : 0,
      cursor: lastCursor ? { id: +lastCursor } : undefined,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        discount: true,
        status: true,
        images: {
          select: {
            id: true,
            path: true,
          },
          take: 1, //show first one image
        },
      },
      orderBy: {
        id: 'desc',
      },
    };
    // const posts = await getPostsList(options);

    //setting cache
    const cahceKey = `products:${JSON.stringify(req.query)}`;
    const products = await getOrSetCache(cahceKey, async () => {
      return await getProductsList(options);
    });

    const hasNextPage = products.length > +limit; // limit is 5 but +1 so total 6

    if (hasNextPage) {
      products.pop();
    }
    const nextCursor =
      products.length > 0 ? products[products.length - 1].id : null;

    res.status(200).json({
      message: 'Get all Infinite products',
      hasNextPage,
      nextCursor,
      prevCursor: lastCursor,
      products,
    });
  },
];
export const getfiltertype = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.userId;
  const user = await getUserById(userId!);
  checkUserIfNotExit(user);
};
