import express from 'express';
import {
  confirmPassword,
  forgetPassword,
  login,
  logout,
  register,
  resetPassword,
  verifyOTP,
  verifyOtpForPassword,
} from '../../controllers/authController';
const router = express.Router();
router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/confirm-password', confirmPassword);
router.post('/login', login);
router.post('/logout', logout);

router.post('/forgetPassword', forgetPassword);
router.post('/verify', verifyOtpForPassword);
router.post('/reset-password', resetPassword);

export default router;
