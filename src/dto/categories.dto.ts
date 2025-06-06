import { Categories } from '@/entities/categories.entity';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches
} from 'class-validator';

export class CreateCategoryDto {
  /**名称 */
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  name!: string;
  /**别名 */
  // @IsString()
  @IsNotEmpty({
    message: '别名不可为空'
  })
  @Matches(/^[a-z0-9-]+$/, {
    message: '别名只能包含小写字母、数字和连字符(-)'
  })
  slug!: string;

  @IsString()
  @IsOptional()
  @Length(0, 255)
  description?: string;
}

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  @Length(1, 50)
  name?: string;

  @IsString()
  @IsOptional()
  @Length(1, 50)

  slug?: string;

  @IsString()
  @IsOptional()
  @Length(0, 255)
  description?: string;
}
export class CategoryResponseDto {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(category: Categories) {
    this.id = category.id;
    this.name = category.name;
    this.slug = category.slug;
    this.description = category.description;
    this.createdAt = category.createdAt;
    this.updatedAt = category.updatedAt;
  }
}

