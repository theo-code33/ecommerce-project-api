import { IsOptional } from 'class-validator';
import { OrderEntity } from 'src/order/entities/order.entity';
import { ProductEntity } from 'src/product/entities/product.entity';

export class UpdateOrderItemDto {
    @IsOptional()
    order: OrderEntity;

    @IsOptional()
    product: ProductEntity;

    @IsOptional()
    quantity: number;
}
