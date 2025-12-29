import express from 'express';
import { auth } from '../../midlewares/auth';
import { authorise } from '../../midlewares/authorise';
import { maintenance } from '../../midlewares/maintenance';
import adminRoutes from './admin';
import userRoutes from './api';
import authRoutes from './auth';

const router = express.Router();
//app.use('/api/v1', healthRoutes);
// router.use('/api/v1', authRoutes); //login,logout,forget pass etc...
// router.use('/api/v1/user', userRoutes); //change-language
// router.use('/api/v1/admins', auth, authorise(true, 'ADMIN'), adminRoutes);
//app.use(viewRoutes);

router.use('/api/v1', maintenance, authRoutes); //login,logout,forget pass etc...
router.use('/api/v1/user', maintenance, userRoutes); //change-language
router.use('/api/v1/admins', auth, authorise(true, 'ADMIN'), adminRoutes);
export default router;
