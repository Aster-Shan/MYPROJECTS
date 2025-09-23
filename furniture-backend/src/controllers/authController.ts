import { NextFunction, Request, Response } from 'express';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(200).json({ message: 'register' });
};
export const verifyOTP = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(200).json({ message: 'verifyOTp' });
};
export const confirmPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(200).json({ message: 'confirmPassword' });
};
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(200).json({ message: 'login' });
};
