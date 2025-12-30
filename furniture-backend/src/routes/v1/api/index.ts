import express from 'express';

import {
  changeLanguage,
  getMyPhoto,
  uploadProfile,
  uploadProfileMultiple,
  uploadProfileOptimize,
} from '../../../controllers/api/profileController';
import { auth } from '../../../midlewares/auth';
import upload, { uploadMemory } from '../../../midlewares/uploadFile';
const router = express.Router();

router.post('/change-Language', changeLanguage);
router.patch('/profile/upload', auth, upload.single('avatar'), uploadProfile);

router.patch(
  '/profile/optimize',
  auth,
  uploadMemory.single('avatar'),
  uploadProfileOptimize,
);

router.patch(
  '/profile/upload/multiple',
  auth,
  upload.array('avatar'),
  uploadProfileMultiple,
);

router.get('/profile/my-photo', getMyPhoto); //just testing
export default router;
