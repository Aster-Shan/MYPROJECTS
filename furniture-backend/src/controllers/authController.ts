import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import { createOtp, getUserByPhone } from '../services/authServices';
import { checkUserExist } from '../utils/auth';
import { generateOTP, generateToken } from '../utils/generate';
export const register = [
  body('phone', 'Invalid Phone Number')
    .trim()
    .notEmpty()
    .withMessage('Empty Phone Number')
    .matches(/^[0-9]+$/)
    .isLength({ min: 5, max: 12 })
    .withMessage('Phone number must be between 5 and 12 digits'),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      const error: any = new Error(errors[0].msg);
      error.status = 400;
      error.code = 'ERROR_Invalid';
      return next(error);
      //return res.status(400).json({ error: error[0].msg });
    }
    let phone = req.body.phone;
    if (phone.slice(0, 2) == '09') {
      phone = phone.substring(2, phone.length);
    }
    const user = await getUserByPhone(phone);
    checkUserExist(user);

    //OTP Sending logic
    const OTP = generateOTP();

    //hash OTP
    const salt = await bcrypt.genSalt(10);
    const hsahOTP = await bcrypt.hash(OTP.toString(), salt);

    const token = generateToken();
    const otpData = {
      phone,
      otp: hsahOTP,
      rememberToken: token,
      count: 1,
    };
    const result = await createOtp(otpData);

    res.status(200).json({
      message: `we are sending otp to 09${result.phone}`,
      phone: result.phone,
      token: result.rememberToken,
    });
  },
];
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
