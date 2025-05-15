import { Context, Next } from 'koa';

export default async function errorMiddleware(ctx: Context, next: Next) {
  try {
    await next();
  } catch (err: any) {
    console.error("errorMiddleware", err);
    ctx.body = {
      message: err.message,
      code: 500,
    };
    // ctx.app.emit('error', err, ctx);
  }
}