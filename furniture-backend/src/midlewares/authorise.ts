import { NextFunction, Request, Response } from 'express';
import { errorCode } from '../../config/errorCode';
import { getUserById } from '../services/authService';
interface CustomRequest extends Request {
  userId?: number;
}

//authorise (true,"ADMIN","AUTHOR")
export const authorise = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.userId;
  const user = await getUserById(userId!);
  if (!user) {
    const err: any = new Error('This account is not registered');
    err.status = 401;
    err.code = errorCode.unauthenticated;
    return next(err);
  }
  next();
};
