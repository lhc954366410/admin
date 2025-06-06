import { Context } from 'koa';
import { validateDto } from '@/utils/validateDto';
import { CreateCategoryDto } from '@/dto/categories.dto';
import categoriesService from '@/services/categories.service';

class CategoriesController {
  async selectList(ctx: Context) {
    ctx.body = {
      code: 200,
      message: "列表查询成功"
    };
  }
  async selectOne(ctx: Context) {
    const userData = ctx.request.body as CreateCategoryDto;
    
    ctx.body = {
      code: 200,
      message:"详情查询成功",
      data: {},

    };
  }

  async add(ctx: Context) {
    const addData = ctx.request.body as CreateCategoryDto;
    const errors = await validateDto(CreateCategoryDto, addData);
    if (errors) {
      ctx.body = errors;
      return
    }
    const resData = await categoriesService.add(addData);   
    
    ctx.body = {
      code: 200,
      message:"添加成功",
      data:resData,
    };

  }

  async update(ctx: Context) {
    const userData = <any>ctx.request.body
    
    ctx.body = {
      code: 200,
      message:"更新成功",
      data: {},
    };

  }
  async delete(ctx: Context) {
    const userData = <any>ctx.request.body
    
    ctx.body = {
      code: 200,
      message:"删除成功",
      data: {},
    };

  }

}

export default new CategoriesController();