import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';

const filestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: filestorage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 2 }, //if 10,file size is so big,user has to download more data so image optimixation is needed
});

//Image Optimization
const storage = multer.memoryStorage();
export const uploadMemory = multer({
  storage: storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 10 }, //if 10,file size is so big,user has to download more data so image optimixation is needed
});
export default upload;
