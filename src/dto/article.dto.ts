import { IsString, IsNotEmpty, IsOptional, IsInt, IsUrl } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsUrl()
  @IsOptional()
  coverImage?: string;

  @IsInt()
  @IsOptional()
  categoryId?: number;
}

export class UpdateArticleDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsUrl()
  @IsOptional()
  coverImage?: string;

  @IsInt()
  @IsOptional()
  categoryId?: number;

  @IsInt()
  @IsOptional()
  status?: number;
}

export class ArticleResponseDto {
  id!: number;
  title!: string;
  content!: string;
  coverImage?: string;
  status!: number;
  viewCount!: number;
  userId!: number;
  categoryId?: number;
  createdAt!: Date;
  updatedAt!: Date;

  static fromEntity(article: ArticleResponseDto): ArticleResponseDto {
    const dto = new ArticleResponseDto();
    dto.id = article.id;
    dto.title = article.title;
    dto.content = article.content;
    dto.coverImage = article.coverImage;
    dto.status = article.status;
    dto.viewCount = article.viewCount;
    dto.userId = article.userId;
    dto.categoryId = article.categoryId;
    dto.createdAt = article.createdAt;
    dto.updatedAt = article.updatedAt;
    return dto;
  }
}