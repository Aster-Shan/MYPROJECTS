import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import moment from 'moment';
import { errorCode } from '../../config/errorCode';
import {
  createOtp,
  createUser,
  getOTPbyPhone,
  getUserById,
  getUserByPhone,
  updateOtp,
  updateUser,
} from '../services/authService';
import {
  checkOtpErrorIfSameDate,
  checkOtpRow,
  checkUerIfNotExit,
  checkUserExist,
} from '../utils/auth';
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
      error.code = errorCode.invalid;
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
    //never request OTP before
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
        //OTP request the same day and over limit
        if (otpRow.count === 3) {
          const error: any = new Error(
            'OTP is allowed to request 3 times per day',
          );
          error.status = 405;
          error.code = errorCode.overLimit;
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
      error.code = errorCode.invalid;
      console.log(errors);
      return next(error);
    }
    const { phone, otp, token } = req.body;
    const user = await getUserByPhone(phone);
    checkUserExist(user);

    const otpRow = await getOTPbyPhone(phone);
    checkOtpRow(otpRow);

    const lastOtpVerify = new Date(otpRow!.updatedAt).toLocaleDateString();
    const today = new Date().toLocaleDateString();
    const isSameDate = lastOtpVerify === today;
    //if otp verify is overlimit within the same date
    checkOtpErrorIfSameDate(isSameDate, otpRow!.error);

    if (otpRow?.rememberToken !== token) {
      const otpData = {
        error: 5,
      };
      await updateOtp(otpRow!.id, otpData);

      const error: any = new Error('Invalid token');
      error.status = 400;
      error.code = errorCode.invalid;
      return next(error);
    }

    //OTP is expired
    const isExpired = moment().diff(otpRow!.updatedAt, 'minutes') > 2;
    if (isExpired) {
      const error: any = new Error('OTP is expired');
      error.status = 403;
      error.code = errorCode.otpExpired;
      return next(error);
    }
    const isMatchOtp = await bcrypt.compare(otp, otpRow!.otp);

    //If OTp is wrong
    if (!isMatchOtp) {
      //if OTp error isfirst time failed in one day
      if (!isSameDate) {
        const otpData = {
          error: 1,
        };
        await updateOtp(otpRow!.id, otpData);
      } else {
        //if not first time today
        const otpData = {
          error: { increment: 1 },
        };
        await updateOtp(otpRow!.id, otpData);
      }
      const error: any = new Error('OTP is incorrect');
      error.status = 401;
      error.code = errorCode.invalid;
      return next(error);
    }

    //All are ok
    const verifyToken = generateToken();
    const otpData = {
      verifyToken,
      error: 0,
      count: 1,
    };
    const result = await updateOtp(otpRow!.id, otpData);

    res.status(200).json({
      message: 'OTp is successfully verified.',
      phone: result.phone,
      token: result.verifyToken,
    });
  },
];

//sending OTP --> Verify OTP --> Confirm Password ==> New Account
export const confirmPassword = [
  body('phone', 'Invalid Phone Number')
    .trim()
    .notEmpty()
    .matches(/^[0-9]+$/)
    .isLength({ min: 5, max: 12 }),
  body('password', 'Password must be 8 digits')
    .trim()
    .notEmpty()
    .matches(/^[0-9]+$/)
    .isLength({ min: 8, max: 8 }),

  body('token', 'Invalid token').trim().notEmpty().isString(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      const error: any = new Error(errors[0].msg);
      error.status = 400;
      error.code = errorCode.invalid;
      return next(error);
    }
    const { phone, password, token } = req.body;

    const user = await getUserByPhone(phone);
    checkUserExist(user);

    const otpRow = await getOTPbyPhone(phone);
    checkOtpRow(otpRow);

    //OTP Error Count is over limit
    if (otpRow?.error === 5) {
      const error: any = new Error('This request may be an attack.');
      error.status = 400;
      error.code = errorCode.attack;
      return next(error);
    }

    //Token is wrong

    if (otpRow?.verifyToken !== token) {
      const otpData = {
        error: 5,
      };
      await updateOtp(otpRow!.id, otpData);
      const error: any = new Error('Invalid token');
      error.status = 400;
      error.code = errorCode.invalid;
      return next(error);
    }

    //Request is expired
    const isExpired = moment().diff(otpRow!.updatedAt, 'minutes') > 10;
    if (isExpired) {
      const error: any = new Error('Your request is expired.Please Try again');
      error.status = 403;
      error.code = errorCode.requestExpired;
      return next(error);
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const randToken = 'I will replace refresh Token soon.';

    const userData = {
      phone,
      password: hashPassword,
      randToken,
    };
    const newUser = await createUser(userData);

    //Access Token
    const accessTokenPayload = { id: newUser.id };
    const refreshTokenPayload = { id: newUser.id, phone: newUser.phone };

    const accessToken = jwt.sign(
      accessTokenPayload,
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: 60 * 15 },
    );

    const refreshToken = jwt.sign(
      refreshTokenPayload,
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: '30d' },
    );
    const userUpdateData = {
      randToken: refreshToken,
    };
    await updateUser(newUser.id, userUpdateData);

    res
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 15 * 60 * 1000,
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        message: 'Successfully created an account',
        userId: newUser.id,
      });
  },
];

//login

export const login = [
  body('phone', 'Invalid Phone Number')
    .trim()
    .notEmpty()
    .matches(/^[0-9]+$/)
    .isLength({ min: 5, max: 12 }),

  body('password', 'Password must be 8 digits')
    .trim()
    .notEmpty()
    .matches(/^[0-9]+$/)
    .isLength({ min: 8, max: 8 }),

  async (req: Request, res: Response, next: NextFunction) => {
    // ---------------- VALIDATION ----------------
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      const error: any = new Error(errors[0].msg);
      error.status = 400;
      error.code = errorCode.invalid;
      return next(error);
    }

    const { phone, password } = req.body;

    // ---------------- FIND USER ----------------
    const user = await getUserByPhone(phone);
    checkUerIfNotExit(user);

    // ---------------- ACCOUNT FREEZE CHECK ----------------
    if (user?.status === 'FREEEZE') {
      const error: any = new Error('Your Account is temporarily freezed');
      error.status = 401;
      error.code = errorCode.accountFreeze;
      return next(error);
    }

    // ---------------- PASSWORD MATCH CHECK ----------------
    const isMatchPassword = await bcrypt.compare(password, user!.password);

    //  WRONG PASSWORD
    if (!isMatchPassword) {
      const lastRequest = new Date(user!.updatedAt).toLocaleDateString();
      const isSameDate = lastRequest == new Date().toLocaleDateString();

      if (!isSameDate) {
        const userData = { errorLoginCount: 1 };
        await updateUser(user!.id, userData);
      } else {
        if (user!.errorLoginCount >= 2) {
          // freeze if 3 wrong
          const userData = { status: 'FREEEZE' };
          await updateUser(user!.id, userData);
        } else {
          const userData = { errorLoginCount: { increment: 1 } };
          await updateUser(user!.id, userData);
        }
      }

      const error: any = new Error(req.t('wrongPassword'));
      error.status = 401;
      error.code = 'ERROR_Invalid';
      return next(error);
    }

    //  CORRECT PASSWORD

    // Token Payloads Authorization token
    const accessTokenPayload = { id: user!.id };
    const refreshTokenPayload = { id: user!.id, phone: user!.phone };

    const accessToken = jwt.sign(
      accessTokenPayload,
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: 60 * 15 },
    );

    const refreshToken = jwt.sign(
      refreshTokenPayload,
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: '30d' },
    );

    // Update user (reset wrong count + save token)
    const userData = {
      errorLoginCount: 0,
      randToken: refreshToken,
    };

    await updateUser(user!.id, userData);

    res
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 15 * 60 * 1000,
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: 'Successfully login',
        userId: user!.id,
      });
  },
];
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //clear http cookies
  //update randtoken in User Table
  const refreshToken = req.cookies ? req.cookies.refreshToken : null;
  if (!refreshToken) {
    const error: any = new Error('You are not an authenticated user!');
    error.status = 401;
    error.code = 'Error_Unauthenticated1';
    return next(error);
  }
  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as {
      id: number;
      phone: String;
    };
  } catch (err) {
    const error: any = new Error('You are not an authenticated user!');
    error.status = 401;
    error.code = 'Error_Unauthenticated2';
    return next(error);
  }
  if (isNaN(decoded.id)) {
    const err: any = new Error('Unauthenticated user');
    err.status = 401;
    err.code = errorCode.unauthenticated;
    return next(err);
  }
  const user = await getUserById(decoded.id);
  checkUerIfNotExit(user);

  if (user!.phone !== decoded.phone) {
    const error: any = new Error('You are not an authenticated user!');
    error.status = 401;
    error.code = 'Error_Unauthenticated3';
    return next(error);
  }
  const userData = {
    randToken: generateToken(),
  };
  await updateUser(user!.id, userData);
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
  });
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
  });
  res.status(200).json({ message: 'Successfully logout' });
};
