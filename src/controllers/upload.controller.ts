// src/controllers/upload.controller.ts
import { singleImageUpload } from '@/middleware/upload';
import { Context } from 'koa';
import path from 'path';

export class UploadController {
  static async uploadImage(ctx: Context) {
    try {
      await singleImageUpload(ctx,  async () => {});
      if (!ctx.file) {
        ctx.throw(400, '请选择要上传的图片');
        return;
      }

      // 生成访问URL
      const fileUrl = `/uploads/${path.basename(ctx.file.path)}`;
      console.log(ctx.file)
      ctx.body = {
        code: 200,
        message: '图片上传成功',
        data: {
          path: fileUrl,
          filename: ctx.file.filename,
          originalname: ctx.file.originalname,
          size: ctx.file.size,
          mimetype: ctx.file.mimetype,
          url:'http://localhost:3000' + fileUrl
        }
      };
    } catch (error:any) {
        console.log(error)
      ctx.body = {
        code: ctx.status,
        message: error.message? error.message + "---": '图片上传失败'
      };
    }
  }
}