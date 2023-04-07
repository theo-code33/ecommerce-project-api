import { IsBoolean, IsBooleanString, IsNumber, IsOptional, IsString } from "class-validator";
import { OrderItemEntity } from "src/order-item/entities/order-item.entity"
import { UserEntity } from "src/user/entities/user.entity";

export class CreateOrderDto {
    @IsString()
    status: string;

    @IsNumber()
    amount: number;

    @IsString()
    @IsOptional()
    items?: OrderItemEntity[];

    @IsString()
    user: UserEntity
}
