import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity({ name: 'categories' })
export class Categories {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int', comment: '主键ID' })
    id!: number;

    @Column({
        name: 'name',
        type: 'varchar',
        length: 50,
        nullable: false,
        comment: '分类名称'
    })
    name!: string;

    @Column({
        name: 'slug',
        type: 'varchar',
        length: 50,
        nullable: false,
        comment: '分类别名(URL友好)'
    })
    @Index('uk_slug', { unique: true }) // 对应 UNIQUE KEY
    slug!: string;

    @Column({
        name: 'description',
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: '分类描述'
    })
    description!: string | null;

    @CreateDateColumn({
        name: 'created_at',
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false,
        precision: 0,
        comment:"创建时间"

    })
    createdAt!: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        nullable: false,
        precision: 0,
        comment:"更新时间"

    })
    updatedAt!: Date;
}
