import express from 'express';

import {
  createPost,
  deletePost,
  updatePost,
} from '../../../controllers/admin/postController';
import { setMaintenace } from '../../../controllers/admin/systemController';
import { getAllUsers } from '../../../controllers/admin/userController';
import upload from '../../../midlewares/uploadFile';
const router = express.Router();

router.get('/user', getAllUsers);
router.post('/maintenance', setMaintenace);
router.post('/posts', upload.single('image'), createPost);
router.patch('/posts', upload.single('image'), updatePost); //patch
router.delete('/posts', deletePost); //delete
export default router;
