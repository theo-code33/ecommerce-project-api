import { OrderEntity } from "src/order/entities/order.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column()
    address: string;

    @Column()
    isAdmin: boolean;

    @OneToMany(type => OrderEntity, order => order.user, {
        cascade: true
    })
    orders: OrderEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}