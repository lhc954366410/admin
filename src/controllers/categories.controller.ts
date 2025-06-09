import { Context } from 'koa';
import { validateDto } from '@/utils/validateDto';
import { CategoryListRequestDto, CreateCategoryDto, DeleteCategoryRequestDto, UpdateCategoryDto } from '@/dto/categories.dto';
import categoriesService from '@/services/categories.service';

class CategoriesController {
  async selectList(ctx: Context) {

    const reqData = ctx.request.body as CategoryListRequestDto;
    const errors = await validateDto(CategoryListRequestDto, reqData);
    if (errors) {
      ctx.body = errors;
      return
    }
    let resData = await categoriesService.selectList(reqData)
    ctx.body = {
      code: 200,
      message: "列表查询成功",
      data:resData
    };
  }
  async selectOne(ctx: Context) {
    const reqData = ctx.request.body as CreateCategoryDto;

    
    ctx.body = {
      code: 200,
      message:"详情查询成功",
      data: {},

    };
  }

  async add(ctx: Context) {
    const reqData = ctx.request.body as CreateCategoryDto;
    const errors = await validateDto(CreateCategoryDto, reqData);
    if (errors) {
      ctx.body = errors;
      return
    }
    const resData = await categoriesService.add(reqData);   
    
    ctx.body = {
      code: 200,
      message:"添加成功",
      data:resData,
    };

  }

  async update(ctx: Context) {
    const reqData = <UpdateCategoryDto>ctx.request.body
    const errors = await validateDto(UpdateCategoryDto, reqData);
    if (errors) {
      ctx.body = errors;
      return
    }
    const resData = await categoriesService.update(reqData);   


    ctx.body = {
      code: 200,
      message:"更新成功",
      data: {},
    };

  }
  async delete(ctx: Context) {
    const reqData = ctx.request.body as DeleteCategoryRequestDto;
    const errors = await validateDto(DeleteCategoryRequestDto, reqData);
    if (errors) {
      ctx.body = errors;
      return
    }
    const resData = await categoriesService.delete(reqData);

    ctx.body = {
      code: 200,
      message:"删除成功",
      data: {},
    };

  }

}

export default new CategoriesController();