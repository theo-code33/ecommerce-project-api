import { OrderEntity } from "src/order/entities/order.entity";
import { ProductEntity } from "src/product/entities/product.entity";

export class CreateOrderItemDto {
    order: OrderEntity;
    product: ProductEntity;
    quantity: number;
}
