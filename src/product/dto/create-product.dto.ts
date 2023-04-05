import { IsNumberString, IsString } from "class-validator";
import { CategoryEntity } from "src/category/entities/category.entity";

export class CreateProductDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumberString()
    price: number;

    @IsNumberString()
    quantity: number;

    @IsString()
    category: CategoryEntity;
}
