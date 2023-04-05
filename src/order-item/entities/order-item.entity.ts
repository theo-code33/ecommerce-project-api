import { OrderEntity } from "src/order/entities/order.entity";
import { ProductEntity } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class OrderItemEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => OrderEntity, order => order.items)
    order: OrderEntity;

    @ManyToOne(type => ProductEntity, product => product.orderItems)
    product: ProductEntity;

    @Column()
    quantity: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}