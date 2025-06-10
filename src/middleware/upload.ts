// src/middlewares/upload.ts
import multer from '@koa/multer';
import path from 'path';

// 存储配置
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../../public/uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`); // 使用UUID生成唯一文件名
  }
});

// 文件过滤器
const fileFilter = (req: any, file: Express.Multer.File, cb:  (error: Error | null, acceptFile: boolean) => void) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('只允许上传JPEG、PNG或GIF格式的图片'),false);
  }
};

// 创建上传中间件实例
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 限制5MB
  }
});

// 单图上传中间件
export const singleImageUpload = upload.single('file');

// 多图上传中间件
export const multipleImageUpload = upload.array('files', 5); // 最多5张图片