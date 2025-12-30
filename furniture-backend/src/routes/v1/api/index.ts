import express from 'express';

import {
  changeLanguage,
  uploadProfile,
} from '../../../controllers/api/profileController';
import { auth } from '../../../midlewares/auth';
import upload from '../../../midlewares/uploadFile';
const router = express.Router();

router.post('/change-Language', changeLanguage);
router.patch('/profile/upload', auth, upload.single('avatar'), uploadProfile);

export default router;
