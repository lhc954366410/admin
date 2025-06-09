
import { AppDataSource } from '@/config/AppDataSource';
import { CategoryListRequestDto, CreateCategoryDto, DeleteCategoryRequestDto, UpdateCategoryDto } from '@/dto/categories.dto';
import { Categories } from '@/entities/categories.entity';
export class CategoriesRepository {
  private repositor = AppDataSource.getRepository(Categories);
  constructor() {

  }

  async findExcludeId (data: UpdateCategoryDto){
    const conflictCategory = await this.repositor
    .createQueryBuilder('category')
    .where('category.id != :id', { id:data.id })
    .andWhere('(category.name = :name OR category.slug = :slug)', {
      name: data.name ,
      slug: data.slug 
    })
    .getOne();
    return conflictCategory
  }


  async categoryExists(name: string, slug: string): Promise<Categories | null> {
    const c = await this.repositor.findOne({
      where: [
        { name },
        { slug }
      ],
    });
    return c;
  }

  async findById(id: number): Promise<Categories | null> {

    const item = await this.repositor.findOneBy({
      id
    })
    return item ;
  }

  async create(data: CreateCategoryDto): Promise<Categories> {
    const categories = new Categories();
    categories.name = data.name;
    categories.slug = data.slug;
    categories.comment = data.comment!;
    const result = await this.repositor.save(categories)
    console.log("result", result)
    return result;
  }
  async update(data:UpdateCategoryDto){
    const categories = new Categories();
    categories.name = data.name;
    categories.slug = data.slug;
    categories.comment = data.comment!;
    categories.id = data.id;
    return this.repositor.save(categories);

  }



  async selectList(reqData: CategoryListRequestDto) {
    const { page, pageSize, name, slug, orderBy } = reqData;

    const queryBuilder = this.repositor
      .createQueryBuilder('category')
      .select([
        'category.id',
        'category.name',
        'category.slug',
        'category.comment',
        'category.createdAt',
        'category.updatedAt'
      ]);

    if (name) {
      queryBuilder.andWhere('category.name LIKE :name', { name: `%${name}%` });
    }

    if (slug) {
      queryBuilder.andWhere('category.slug LIKE :slug', { slug: `%${slug}%` });
    }
    const [sortBy, sortOrder] = orderBy.split(" ")
    const [categories, total] = await queryBuilder
      .orderBy(`category.${sortBy}`, sortOrder.toLocaleUpperCase() as "ASC" | "DESC")
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return {
      list: categories,//.map(category => new CategoryResponseDto(category)),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };


  }
  async delete(reqData:DeleteCategoryRequestDto){
    const result = await this.repositor.delete(reqData.id);
    return !!result.affected;

  }

}

export default new CategoriesRepository();