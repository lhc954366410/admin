import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from "typeorm";
@Entity({ name: 'users' }) // 指定表名
export class User {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', comment: '主键ID' })
  id!: number;

  @Column({ 
    name: 'user_name',
    type: 'varchar',
    length: 50,
    nullable: false,
    comment: '用户名',
    unique: true // 唯一约束
  })
  @Index('idx_user_name', { unique: true }) // 索引
  userName!: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: '邮箱',
    unique: true // 唯一约束
  })
  @Index('idx_email', { unique: true }) // 索引
  email!: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '密码(加密存储)',
    // select: false // 查询时默认不返回
  })
  password!: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 20,
    nullable: true,
    comment: '手机号'
  })
  phone!: string | null;

  @Column({
    name: 'avatar',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: '头像URL'
  })
  avatar!: string | null;

  @Column({
    name: 'status',
    type: 'tinyint',
    default: 1,
    nullable: false,
    comment: '状态(0-禁用,1-正常)'
  })
  status!: number;

  @Column({
    name: 'last_login',
    type: 'datetime',
    nullable: true,
    comment: '最后登录时间'
  })
  lastLogin!: Date | null;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
    comment: '创建时间',
    precision:0,
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: false,
    comment: '更新时间',
    precision:0
  })
  updatedAt!: Date;
}