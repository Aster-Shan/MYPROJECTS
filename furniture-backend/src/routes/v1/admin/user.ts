import express from 'express';

import { getAllUsers } from '../../../controllers/admin/userController';
const router = express.Router();

router.get('/user', getAllUsers);

export default router;
