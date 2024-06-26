import multer, { FileFilterCallback } from 'multer';
import path from 'path';

const upload = multer({
  storage: multer.diskStorage({
    filename: (_req, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      let ext = path.extname(file.originalname);
      cb(null, `IMG-${Date.now()}${ext}`);
    }
  }),

  fileFilter: (_req, file: Express.Multer.File, cb: FileFilterCallback) => {
    let ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg' && ext !== '.webp') {
      cb(new Error('File type is not supported'));
      return ;
    }
    cb(null, true);
  }
})  

export default upload;
