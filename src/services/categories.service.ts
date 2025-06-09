import { config } from '@/config/env';
import { CategoryListRequestDto, CreateCategoryDto, DeleteCategoryRequestDto, UpdateCategoryDto } from '@/dto/categories.dto';
import { Categories } from '@/entities/categories.entity';
import { User } from '@/entities/User.entity';
import categoriesRepository from '@/repositories/categories.repository';
import * as bcrypt from 'bcrypt';

class CategoriesService {

    /**
     * 创建
     * @param data  
     * @returns 
     */

    async add(data: CreateCategoryDto): Promise<Categories> {
        // 检查邮箱是否已存在
        const findOne = await categoriesRepository.categoryExists(data.name, data.slug);
        if (findOne) {
            if (findOne.name == data.name) {
                throw new Error('名称已存在！');
            }
            if (findOne.slug == data.slug) {
                throw new Error('别名已存在！');
            }
        }
        // 创建用户
        return categoriesRepository.create(data);
    }
    async update(data: UpdateCategoryDto) {
          // 1. 检查分类是否存在
        const existingCategory = await categoriesRepository.findById(data.id );
        if (!existingCategory) {
            throw new Error("分类不存在")
        }

        
        const findOne = await categoriesRepository.findExcludeId(data);
        if (findOne) {
            if (findOne.name == data.name) {
                throw new Error('名称已存在！');
            }
            if (findOne.slug == data.slug) {
                throw new Error('别名已存在！');
            }
        }
        // 创建用户
        return categoriesRepository.update(data);
    }



    async selectList(reqData: CategoryListRequestDto) {
        return categoriesRepository.selectList(reqData)


    }
    async delete(reqData: DeleteCategoryRequestDto) {
        let res = await categoriesRepository.delete(reqData);
        if (!res) {
            throw new Error("id不存在，无删除记录！")
        }
        return res


    }

}

export default new CategoriesService();