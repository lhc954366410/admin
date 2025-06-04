import { Category } from '@/entities/category.entity';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  @Matches(/^[a-z0-9-]+$/, {
    message: 'slug只能包含小写字母、数字和连字符(-)'
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

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
    this.slug = category.slug;
    this.description = category.description;
    this.createdAt = category.createdAt;
    this.updatedAt = category.updatedAt;
  }
}

