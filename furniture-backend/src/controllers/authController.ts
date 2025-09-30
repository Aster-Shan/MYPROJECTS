import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import {
  createOtp,
  getOTPbyPhone,
  getUserByPhone,
  updateOtp,
} from '../services/authServices';
import { checkOtpErrorIfSameDate, checkUserExist } from '../utils/auth';
import { generateToken } from '../utils/generate';
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
    // const OTP = generateOTP();

    const OTP = 123456;
    //hash OTP
    const salt = await bcrypt.genSalt(10);
    const hsahOTP = await bcrypt.hash(OTP.toString(), salt);

    const token = generateToken();
    const otpRow = await getOTPbyPhone(phone);
    let result;
    if (!otpRow) {
      const otpData = {
        phone,
        otp: hsahOTP,
        rememberToken: token,
        count: 1,
      };
      result = await createOtp(otpData);
    } else {
      const lastOtpRequest = new Date(otpRow.updatedAt).toLocaleDateString();
      const today = new Date().toLocaleDateString();
      const isSameDate = lastOtpRequest === today;
      checkOtpErrorIfSameDate(isSameDate, otpRow.error);

      if (!isSameDate) {
        const otpData = {
          otp: hsahOTP,
          rememberToken: token,
          count: 1,
          error: 0,
        };
        result = await updateOtp(otpRow.id, otpData);
      } else {
        if (otpRow.count === 3) {
          const error: any = new Error(
            'OTP is allowed to request 3 times per day',
          );
          error.status = 405;
          error.code = 'Error_OTP Overlimit';
          return next(error);
        } else {
          const otpData = {
            otp: hsahOTP,
            rememberToken: token,
            count: {
              increment: 1,
            },
          };
          result = await updateOtp(otpRow.id, otpData);
        }
      }
    }
    res.status(200).json({
      message: `we are sending otp to 09${result.phone}`,
      phone: result.phone,
      token: result.rememberToken,
    });
  },
];

export const verifyOTP = [
  body('phone', 'Invalid Phone Number')
    .trim()
    .notEmpty()
    .matches(/^[0-9]+$/)
    .isLength({ min: 5, max: 12 }),
  body('otp', 'Invalid OTP')
    .trim()
    .notEmpty()
    .matches(/^[0-9]+$/)
    .isLength({ min: 6, max: 6 }),

  body('token', 'Invalid token').trim().notEmpty().escape(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      const error: any = new Error(errors[0].msg);
      error.status = 400;
      error.code = 'ERROR_Invalid';
      console.log(errors);
      return next(error);
    }
    res.status(200).json({ message: 'verifyOTp' });
  },
];
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
