import { Context } from 'koa';
import userService from '@/services/user.service';
// import { CreateUserDto, UserResponse } from '@/models/user.model';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserDto, LoginUserDto } from '@/dto/user.dto';
import { validateDto } from '@/utils/validateDto';
import { TokenService } from '@/services/token.service';

class AuthController {
  async checkLogin(ctx: Context) {
    const authHeader = ctx.headers.authorizationtoken;
    if (!authHeader) {
      ctx.status = 401;
      ctx.body = { message: '未提供认证令牌' };
      return;
    }
    try {
      const res = await TokenService.verifyToken(authHeader as string)
      ctx.body = {
        code: 200,
        message: "登录成功"
      };
    } catch (e) {
      ctx.status = 401;
      ctx.body = { message: '登录已过期' };
      return;
    }


  }




  async register(ctx: Context) {
    const userData = ctx.request.body as CreateUserDto;
    // const teamDto = plainToInstance(CreateUserDto, userData);
    // const errors = await validate(teamDto);
    const errors = await validateDto(CreateUserDto, userData);
    if (errors) {
      ctx.body = errors;
      return
    }
    const user = await userService.register(userData);
    ctx.body = {
      code: 200,
      data: user,

    };
  }

  async login(ctx: Context) {
    const userData = <LoginUserDto>ctx.request.body
    const errors = await validateDto(LoginUserDto, userData);
    if (errors) {
      ctx.body = errors;
      return
    }
    const user = await userService.validateCredentials(userData);
    if (!user) {
      ctx.body = {
        message: '用户名或密码不正确',
        code: '5000',
      };
      return;
    }
    const accessToken = TokenService.generateAccessToken(user.id)
    const { password, createdAt, updatedAt, lastLogin, ...u } = user

    ctx.body = {
      code: 200,
      data: {
        ...u,
        token: accessToken
      },
    };

  }
}

export default new AuthController();