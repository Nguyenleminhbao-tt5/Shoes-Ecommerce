import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from "class-validator";
import { TransactionDto } from "./transaction.dto";
import { Expose } from "class-transformer";
import { BaseDto } from "@/common/dto/base.dto";



export class OrderDto extends BaseDto {
    @IsNotEmpty()
    @ArrayNotEmpty()
    @IsArray()
    list_cart: string[];

    @IsNotEmpty()
    @IsString()
    @Expose()
    user_phone: string;

    @IsNotEmpty()
    @IsString()
    @Expose()
    user_address: string;

    @IsNotEmpty()
    @IsString()
    @Expose()
    payment: string;
}