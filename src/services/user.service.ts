import { config } from '@/config/env';
import { CreateUserDto, LoginUserDto } from '@/dto/user.dto';
import { User } from '@/entities/User.entity';
import userRepository from '@/repositories/user.repository';
import * as bcrypt from 'bcrypt';

class UserService {
  /**
   * 生成密码
   * @param password 
   * @returns 
   */
  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, config.app.saltRounds);
  }
  /**
   * 注册
   * @param userData 
   * @returns 
   */

  async register(userData: CreateUserDto): Promise<User> {
    // 检查邮箱是否已存在
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('邮箱已存在！');
    }
    // 创建用户
    userData.password = await this.hashPassword(userData.password);
    return userRepository.create(userData);
  }

  /**
   * 校验用户登录
   * @param data 
   * @returns 
   */

  async validateCredentials(data: LoginUserDto): Promise<User | null> {
    const user = await userRepository.findByEmail(data.email);
    if (!user) return null;
    const isValid = await bcrypt.compare(data.password, user.password!);
    return isValid ? user : null;
  }
}

export default new UserService();