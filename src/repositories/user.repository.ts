
import { AppDataSource } from '@/config/AppDataSource';
import { CreateUserDto, UserResponseDto } from '@/dto/user.dto';
import { User } from '@/entities/User.entity';
export class UserRepository{
  private userRep = AppDataSource.getRepository(User);
  constructor() {
    
  }
  async findByEmail(email: string): Promise<User | null> {

    const firstUser = await this.userRep.findOneBy({
      email
    })  
    return firstUser || null;
  }

  async create(userData: CreateUserDto): Promise<User> {
    const user = new User();
    user.userName=userData.userName;
    user.email=userData.email;
    user.password= userData.password;
    const result = await this.userRep.save(user)     
    return result ;
  }
}

export default new UserRepository();