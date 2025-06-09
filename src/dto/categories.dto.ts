import { Categories } from '@/entities/categories.entity';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches,
  IsNumber
} from 'class-validator';
import { BaseRequestListDto } from './baseRequestList.dto';

export class CreateCategoryDto {
  /**名称 */
  @IsNotEmpty({message:"名称不能为空"})
  name!: string;

  /**别名 */
  @IsNotEmpty({
    message: '别名不可为空'
  })
  @Matches(/^[a-z0-9-]+$/, {
    message: '别名只能包含小写字母、数字和连字符(-)'
  })
  slug!: string;

  /**描述 */
  @Length(0, 255)
  comment?: string;
}

export class UpdateCategoryDto {
    @IsNotEmpty({message:"id不能为空"})
    id!:number;

    /**名称 */
    @IsNotEmpty({message:"名称不能为空"})
    name!: string;
  
    /**别名 */
    @IsNotEmpty({
      message: '别名不可为空'
    })
    @Matches(/^[a-z0-9-]+$/, {
      message: '别名只能包含小写字母、数字和连字符(-)'
    })
    slug!: string;
  
    /**描述 */
    comment?: string;
}
export class CategoryResponseDto {
  id: number;
  name: string;
  slug: string;
  comment: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(category: Categories) {
    this.id = category.id;
    this.name = category.name;
    this.slug = category.slug;
    this.comment = category.comment;
    this.createdAt = category.createdAt;
    this.updatedAt = category.updatedAt;
  }
}

export class CategoryListRequestDto extends BaseRequestListDto{
  name?:string
  slug?:string

}

export class DeleteCategoryRequestDto {
  @IsNotEmpty({message:"id是必须的！"})
  id!:number
}