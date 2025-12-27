import express from 'express';

import { changeLanguage } from '../../../controllers/api/profileController';
const router = express.Router();

router.post('/change-Language', changeLanguage);

export default router;
