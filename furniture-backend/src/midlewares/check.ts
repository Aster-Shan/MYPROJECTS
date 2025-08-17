import { NextFunction, Request, Response } from "express";

interface Customrequest extends Request {
  userId?: number;
}

export const check = (
  req: Customrequest,
  res: Response,
  next: NextFunction
) => {
  // const err: any = new Error("Token is expired.");
  // err.status = 401;
  // err.code = "Error_TokenExpired";
  // return next(err);
  req.userId = 12345;
  next();
};
