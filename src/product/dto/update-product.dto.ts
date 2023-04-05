import { IsNumberString, IsOptional } from "class-validator";
import { CategoryEntity } from "src/category/entities/category.entity";

export class UpdateProductDto {
    @IsOptional()
    name: string;
    
    @IsOptional()
    description: string;
    
    @IsOptional()
    @IsNumberString()
    price: number;
    
    @IsOptional()
    @IsNumberString()
    quantity: number;

    @IsOptional()
    category: CategoryEntity;
}
