import { Context } from 'koa';
import userService from '@/services/user.service';
import { CreateUserDto, UserResponse } from '@/models/user.model';
// import { validate } from '@/validators/auth.validator';

class AuthController {
  async register(ctx: Context) {
    // 验证输入
    // const { error, value } = validate(ctx.request.body);
    // if (error) {
    //   ctx.status = 400;
    //   ctx.body = { error: error.message };
    //   return;
    // }

    try {
      const userData = ctx.request.body as CreateUserDto;
      const user = await userService.register(userData);

      // 移除敏感信息
      const { password_hash, ...response } = user;

      ctx.status = 201;
      ctx.body = { user: response };
    } catch (err: any) {
      ctx.status = 400;
      ctx.body = { error: err.message };
    }
  }

  async login(ctx: Context) {
    const { email, password } = <any>ctx.request.body;

    // try {
    const user = await userService.validateCredentials(email, password);

    if (!user) {
      ctx.status = 401;
      ctx.body = { error: 'Invalid credentials' };
      return;
    }

    // 生成token等逻辑...
    const { password_hash, ...response } = user;

    ctx.body = { user: response };
    // } catch (err) {
    //   console.error(err);
    //   ctx.status = 500;
    //   ctx.body = { error: 'Login failed' };
    // }
  }
}

export default new AuthController();