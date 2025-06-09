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
        name: 'comment',
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: '分类描述'
    })
    comment!: string | null;

    @CreateDateColumn({
        name: 'created_at',
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false,
        precision: 0,
        comment:"创建时间",
        // transformer: {
        //     from: (value: Date) => {
        //       // 从UTC转为本地时间（+8小时）
        //       return new Date(value.getTime() + 8 * 60 * 60 * 1000);
        //     },
        //     to: (value: Date) => {
        //       // 从本地时间转为UTC（-8小时）
        //       return new Date(value.getTime() - 8 * 60 * 60 * 1000);
        //     }
        //   }
        

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
