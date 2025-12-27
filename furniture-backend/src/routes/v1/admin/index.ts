import express from 'express';

import { setMaintenace } from '../../../controllers/admin/systemController';
import { getAllUsers } from '../../../controllers/admin/userController';

const router = express.Router();

router.get('/user', getAllUsers);
router.post('/maintenance', setMaintenace);

export default router;
