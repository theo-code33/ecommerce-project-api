import { IsOptional } from "class-validator";
import { OrderEntity } from "src/order/entities/order.entity";

export class UpdateUserDto {
    @IsOptional()
    name: string;

    @IsOptional()
    email: string;

    @IsOptional()
    password: string;

    @IsOptional()
    address: string;

    @IsOptional()
    isAdmin: boolean;

    orders: OrderEntity[];
}
