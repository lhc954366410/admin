
import { AppDataSource } from '@/config/AppDataSource';
import { CreateCategoryDto } from '@/dto/categories.dto';
import { Categories } from '@/entities/categories.entity';
export class CategoriesRepository{
  private repositor = AppDataSource.getRepository(Categories);
  constructor() {
    
  }

  async categoryExists(name:string,slug:string): Promise<Categories | null> {
    const c = await this.repositor.findOne({
        where: [
          { name },
          { slug }
        ]
      });      
      return c;
  }

  async findById(id: number): Promise<Categories | null> {

    const item = await this.repositor.findOneBy({
      id
    })  
    return item || null;
  }

  async create(data: CreateCategoryDto): Promise<Categories> {
    const categories = new Categories();
    categories.name = data.name;
    categories.slug=data.slug;
    categories.description=data.description!;    
    const result = await this.repositor.save(categories)   
    console.log("result",result)  
    return result ;
  }
}

export default new CategoriesRepository();