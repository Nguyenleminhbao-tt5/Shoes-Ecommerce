import { BaseDto } from "@/common/dto/base.dto";
import { Expose } from "class-transformer";
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";



export class CartDto extends BaseDto {

    @IsEmpty()
    user_id: string;

    @IsNotEmpty()
    @IsString()
    @Expose()
    product_id: string;

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    qty: number;

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    amount: number;

    @IsEmpty()
    status: string;

}