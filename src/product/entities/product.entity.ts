import { CategoryEntity } from "src/category/entities/category.entity";
import { OrderItemEntity } from "src/order-item/entities/order-item.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @ManyToOne(type => CategoryEntity, category => category.products)
    category: CategoryEntity;

    @OneToMany(type => OrderItemEntity, orderItem => orderItem.product, {
        cascade: true
    })
    orderItems: OrderItemEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
