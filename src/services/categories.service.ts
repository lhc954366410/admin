import { config } from '@/config/env';
import { CreateCategoryDto } from '@/dto/categories.dto';
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
        console.log("findOne",findOne)
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


}

export default new CategoriesService();