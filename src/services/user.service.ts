import { config } from '@/config/env';
import { CreateUserDto, LoginUserDto, UserResponseDto } from '@/dto/user.dto';
import userRepository from '@/repositories/user.repository';
import * as bcrypt from 'bcrypt';

class UserService {
  async register(userData: CreateUserDto): Promise<UserResponseDto> {
    // 检查邮箱是否已存在
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('邮箱已存在！');
    }    
    // 创建用户
    return userRepository.create(userData);
  }

  async validateCredentials(data:LoginUserDto): Promise<UserResponseDto | null> {
    const user = await userRepository.findByEmail(data.email);
    if (!user) return null;    
    const hashedPassword = await bcrypt.hash(data.password, config.app.saltRounds);
    console.log(user!.password)
    console.log(hashedPassword)

    const isValid =  await bcrypt.compare(user.password!,hashedPassword);
    return isValid ? user : null;
  }
}

export default new UserService();