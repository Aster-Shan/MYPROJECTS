import { Request } from 'express';
import fs from 'fs';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

const uploadDir = path.join(__dirname, '..', 'uploads', 'images');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const filestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', 'uploads', 'images')); //important ==> use an absolute path & ensure the directory exists
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    const uniqueSuffix =
      Date.now() + '-' + Math.round(Math.random() * 1e9) + '.' + ext;
    cb(null, uniqueSuffix);
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
  limits: { fileSize: 1024 * 1024 * 10 }, //if 10,file size is so big,user has to download more data so image optimixation is needed
});

//Image Optimization
const storage = multer.memoryStorage();
export const uploadMemory = multer({
  storage: storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 10 }, //if 10,file size is so big,user has to download more data so image optimixation is needed
});
export default upload;
