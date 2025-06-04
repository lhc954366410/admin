import { User } from '@/entities/User.entity';
import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsOptional, IsPhoneNumber, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)

  userName!: string;

  @IsNotEmpty()
  @IsEmail({}, { message: '邮箱格式不正确' })
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password!: string;

  @IsOptional()
  @IsPhoneNumber('CN')
  phone?: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail({}, { message: '邮箱格式不正确' })
  email!: string;

  @IsNotEmpty()
  password!: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  userName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password?: string;

  @IsOptional()
  @IsPhoneNumber('CN')
  phone?: string;

  @IsOptional()
  avatar?: string;

  @IsOptional()
  @IsIn([0, 1])
  status?: number;
}

export class UserResponseDto {
  id: number;
  userName: string;
  email: string;
  phone?: string;
  avatar?: string;
  status: number;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  password?: string;

  constructor(user: User) {
    this.id = user.id;
    this.userName = user.userName;
    this.email = user.email;
    this.phone = user.phone!;
    this.avatar = user.avatar!;
    this.status = user.status;
    this.lastLogin = user.lastLogin!;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}