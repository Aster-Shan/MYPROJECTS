import { NextFunction, Request, Response } from 'express';
import { param, validationResult } from 'express-validator';
import { errorCode } from '../../../config/errorCode';
import { getUserById } from '../../services/authService';
import { getProductWithRelations } from '../../services/productService';
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

export const getProductsByPagination = () => {};
