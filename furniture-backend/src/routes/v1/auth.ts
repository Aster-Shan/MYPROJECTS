import express from 'express';
import {
  confirmPassword,
  login,
  logout,
  register,
  verifyOTP,
} from '../../controllers/authController';
const router = express.Router();
router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/confirm-password', confirmPassword);
router.post('/login', login);
router.post('/logout', logout);

export default router;
