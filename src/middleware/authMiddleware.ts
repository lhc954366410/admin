import { config } from '@/config/env';
import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';

export async function authMiddleware(ctx: Context, next: Next) {
  // 从请求头获取 token
  const token = ctx.headers.authorizationtoken as string;
  console.log('token',typeof token)
  
  if (token==="undefined") {
    ctx.body = { 
        code: 405,
        message: 'token 不存在' 
    };
    return;
  }

  try {
    // 验证 token
    const decoded = jwt.verify(token, config.jwt.secret) as { sub: string };
    ctx.state.userId = decoded.sub; // 将用户ID存入上下文
  } catch (err) {
    ctx.body = { 
        code: 401,
        message: 'token 验证失败'
     };
     return 
  }
  await next();

}