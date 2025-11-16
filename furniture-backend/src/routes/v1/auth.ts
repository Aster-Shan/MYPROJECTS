import express from 'express';
import {
  confirmPassword,
  login,
  register,
  verifyOTP,
} from '../../controllers/authController';
const router = express.Router();
router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/confirm-password', confirmPassword);
router.post('/login', login);

export default router;
