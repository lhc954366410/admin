import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from "typeorm";
export class BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int', comment: '主键ID' })
    id!: number;


    @Column({
        name: 'status',
        type: 'tinyint',
        default: 1,
        nullable: false,
        comment: '状态(0-禁用,1-正常)'
    })
    status!: number;

    @CreateDateColumn({
        name: 'created_at',
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false,
        comment: '创建时间',
        precision:0
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
    @Column({
        name: 'comment',
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: '备注'
    })
    comment!: string | null;
}