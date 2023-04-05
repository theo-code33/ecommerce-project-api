import { OrderEntity } from "src/order/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(type => OrderEntity, order => order.user)
    orders: OrderEntity[];
}