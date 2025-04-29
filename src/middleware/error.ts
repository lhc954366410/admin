import { Context, Next } from 'koa';

export default async function errorMiddleware(ctx: Context, next: Next) {
  try {
    await next();
  } catch (err:any) {
    console.log("err----------",err);
    ctx.status = err.status || 500;
    ctx.body = {
      message: err.message || 'Internal Server Error',
      code: err.code || 'INTERNAL_ERROR',
      
    };
    
    ctx.app.emit('error', err, ctx);
  }
}