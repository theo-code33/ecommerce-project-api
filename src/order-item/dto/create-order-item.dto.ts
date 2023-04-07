import { IsNumber, IsNumberString, IsString } from "class-validator";
import { OrderEntity } from "src/order/entities/order.entity";
import { ProductEntity } from "src/product/entities/product.entity";

export class CreateOrderItemDto {
    @IsString()
    order: OrderEntity;

    @IsString()
    product: ProductEntity;

    @IsNumber()
    quantity: number;
}
