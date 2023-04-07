import { IsOptional } from 'class-validator';
import { OrderItemEntity } from 'src/order-item/entities/order-item.entity';
import { UserEntity } from 'src/user/entities/user.entity';

export class UpdateOrderDto {
    @IsOptional()
    status: string;
    
    @IsOptional()
    amount: number;

    @IsOptional()
    items?: OrderItemEntity[];

    @IsOptional()
    user: UserEntity
}
