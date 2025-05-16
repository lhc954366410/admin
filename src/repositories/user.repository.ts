import { CreateUserDto, UserResponseDto } from '@/dto/user.dto';
import { BaseRepository } from '@/repositories/base.repository';

export class UserRepository extends BaseRepository<UserResponseDto> {
  constructor() {
    super('users');
  }

  async findByEmail(email: string): Promise<UserResponseDto | null> {

    const rows = await this.query(
      `SELECT * FROM ${this.tableName} WHERE email = ?`,
      [email]
    );

    return rows[0] || null;
  }

  async create(userData: CreateUserDto): Promise<UserResponseDto> {
    const result = await this.query(
      `INSERT INTO ${this.tableName} SET ?`, 
      [{
        userName: userData.userName,
        email: userData.email,
        password: userData.password
      }]
    );
    return this.findById(result.insertId) as Promise<UserResponseDto>;
  }
}

export default new UserRepository();