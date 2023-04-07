import { OrderItemEntity } from "src/order-item/entities/order-item.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('order')
export class OrderEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    status: string;

    @Column()
    amount: number;

    @ManyToOne(type => UserEntity, user => user.orders)
    user: UserEntity;

    @OneToMany(type => OrderItemEntity, orderItem => orderItem.order)
    items: OrderItemEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;    
}
