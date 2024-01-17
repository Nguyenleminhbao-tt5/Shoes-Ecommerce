import { BaseDto } from "@/common/dto/base.dto";
import { Expose } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";



export class ProductDto extends BaseDto{
    @IsNotEmpty()
    @IsString()
    @Expose()
    product_name: string;

    @IsNotEmpty()
    @IsString()
    @Expose()
    category_name: string;

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    price: number;

    @IsNotEmpty()
    @IsString()
    @Expose()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    discount: number;
    
    @IsNotEmpty()
    @IsArray()
    @Expose()
    image_list: string[];
}