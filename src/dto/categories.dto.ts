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
    id!: number;
  
    name!: string;
  
    slug!: string;

    description?: string;
  
    createdAt!: Date;

    updatedAt!: Date;
  
    static fromEntity(category: any): CategoryResponseDto {
      const dto = new CategoryResponseDto();
      dto.id = category.id;
      dto.name = category.name;
      dto.slug = category.slug;
      dto.description = category.description;
      dto.createdAt = category.createdAt;
      dto.updatedAt = category.updatedAt;
      return dto;
    }
  }