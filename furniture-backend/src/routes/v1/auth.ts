import express from 'express';
import {
  authCheck,
  confirmPassword,
  forgetPassword,
  login,
  logout,
  register,
  resetPassword,
  verifyOTP,
  verifyOtpForPassword,
} from '../../controllers/authController';
import { auth } from '../../midlewares/auth';

const router = express.Router();

router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/confirm-password', confirmPassword);
router.post('/login', login);
router.post('/logout', logout);

router.post('/forgetPassword', forgetPassword);
router.post('/verify', verifyOtpForPassword);
router.post('/reset-password', resetPassword);

router.get('/auth-check', auth, authCheck);

export default router;
