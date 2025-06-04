import { Context } from 'koa';
import { CreateUserDto, LoginUserDto } from '@/dto/user.dto';
import { validateDto } from '@/utils/validateDto';

class CategoriesController {
  async selectList(ctx: Context) {
    ctx.body = {
      code: 200,
      message: "列表查询成功"
    };
  }
  async selectOne(ctx: Context) {
    const userData = ctx.request.body as CreateUserDto;
    
    ctx.body = {
      code: 200,
      message:"详情查询成功",
      data: {},

    };
  }

  async add(ctx: Context) {
    const userData = <LoginUserDto>ctx.request.body
    
    ctx.body = {
      code: 200,
      message:"添加成功",
      data: {},
    };

  }

  async update(ctx: Context) {
    const userData = <LoginUserDto>ctx.request.body
    
    ctx.body = {
      code: 200,
      message:"更新成功",
      data: {},
    };

  }
  async delete(ctx: Context) {
    const userData = <LoginUserDto>ctx.request.body
    
    ctx.body = {
      code: 200,
      message:"删除成功",
      data: {},
    };

  }

}

export default new CategoriesController();