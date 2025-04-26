import userRepository from '@/repositories/user.repository';
import { CreateUserDto, IUser } from '@/models/user.model';

class UserService {
  async register(userData: CreateUserDto): Promise<IUser> {
    // 检查邮箱是否已存在
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }
    
    // 创建用户
    return userRepository.create(userData);
  }

  async validateCredentials(email: string, password: string): Promise<IUser | null> {
    const user = await userRepository.findByEmail(email);
    if (!user) return null;
    
    const isValid =  true//await bcrypt.compare(password, user.password_hash);
    return isValid ? user : null;
  }
}

export default new UserService();