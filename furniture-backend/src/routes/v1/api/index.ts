import express from 'express';

import {
  getinfinitePostsByPagination,
  getPost,
  getPostsByPagination,
} from '../../../controllers/api/postController';
import {
  getfiltertype,
  getProduct,
  getProductsByPagination,
} from '../../../controllers/api/productController';
import {
  changeLanguage,
  getMyPhoto,
  uploadProfile,
  uploadProfileMultiple,
  uploadProfileOptimize,
} from '../../../controllers/api/profileController';
import { auth } from '../../../midlewares/auth';
import upload from '../../../midlewares/uploadFile';
const router = express.Router();

router.post('/change-Language', changeLanguage);
router.patch('/profile/upload', auth, upload.single('avatar'), uploadProfile);

router.patch(
  '/profile/optimize',
  auth,
  upload.single('avatar'),
  uploadProfileOptimize,
);

router.patch(
  '/profile/upload/multiple',
  auth,
  upload.array('avatar'),
  uploadProfileMultiple,
);

router.get('/profile/my-photo', getMyPhoto); //just testing

router.get('/posts/infinite', auth, getinfinitePostsByPagination); //cursor pagination
router.get('/posts/:id', auth, getPost);
router.get('/posts', auth, getPostsByPagination); //offsetPagination

router.get('/products', auth, getProductsByPagination); //cursor pagination
router.get('/products/:id', auth, getProduct);
router.get('/filter-type', auth, getfiltertype);
// router.get('/products', auth, getProductsByPagination); //offsetPagination

export default router;
