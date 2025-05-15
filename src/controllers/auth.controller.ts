import { Context } from 'koa';
import userService from '@/services/user.service';
// import { CreateUserDto, UserResponse } from '@/models/user.model';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserDto, LoginUserDto } from '@/dto/user.dto';
import { validateDto } from '@/utils/validateDto';

class AuthController {
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
    ctx.body = {
      code: 200,
      data: {},
    };

  }
}

export default new AuthController();