import { IsBoolean, IsEmail, IsPhoneNumber, IsString } from "class-validator";
import { OrderEntity } from "src/order/entities/order.entity";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    address: string;

    @IsBoolean()
    isAdmin: boolean;

    orders?: OrderEntity[];
}
