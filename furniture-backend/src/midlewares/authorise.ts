import { NextFunction, Request, Response } from 'express';
import { errorCode } from '../../config/errorCode';
import { getUserById } from '../services/authService';
import { createError } from '../utils/error';
interface CustomRequest extends Request {
  userId?: number;
  user?: any;
}

//authorise (true,"ADMIN","AUTHOR")
//authorise(false,"USER")
export const authorise = (permission: boolean, ...roles: string[]) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const user = await getUserById(userId!);
    if (!user) {
      return next(
        createError(
          'This account has not registered',
          401,
          errorCode.unauthenticated,
        ),
      );
    }

    const result = roles.includes(user.role);
    if (permission && !result) {
      return next(
        createError('This action is not allowed', 403, errorCode.unauthorised),
      );
    }
    if (!permission && result) {
      return next(
        createError('This action is not allowed', 403, errorCode.unauthorised),
      );
    }
    req.user = user;
    next();
  };
};
