export interface IUser {
    id?: number;
    username: string;
    email: string;
    password_hash: string;
    created_at?: Date;
    updated_at?: Date;
  }
  
  // 数据传输对象
  export type CreateUserDto = {
    username: string;
    email: string;
    password: string;
  };
  
  export type UserResponse = Omit<IUser, 'password_hash'>;