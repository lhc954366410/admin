import { BaseRepository } from '@/repositories/base.repository';
import { IUser, CreateUserDto } from '@/models/user.model';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super('users');
  }

  async findByEmail(email: string): Promise<IUser | null> {

    const [rows] = await this.query(
      `SELECT * FROM ${this.tableName} WHERE email = ?`,
      [email]
    );

    return rows[0] || null;
  }

  async create(userData: CreateUserDto): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
    
    const [result] = await this.query(
      `INSERT INTO ${this.tableName} SET ?`, 
      [{
        username: userData.username,
        email: userData.email,
        password_hash: hashedPassword
      }]
    );
    
    return this.findById(result.insertId) as Promise<IUser>;
  }
}

export default new UserRepository();