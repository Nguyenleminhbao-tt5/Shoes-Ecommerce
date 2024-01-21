import { BaseDto } from "@/common/dto/base.dto";
import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class PaymentMethod {
    static CASH = 'CASH';
    static MOMO = 'MOMO';
}


export class TransactionDto extends BaseDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    user_name: string;

    @IsNotEmpty()
    @IsString()
    @Expose()
    user_phone: string;

    @IsNotEmpty()
    @IsEmail()
    @Expose()
    user_email: string;

    @IsNotEmpty()
    @IsEmail()
    @Expose()
    user_address: string;

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    amount: number;

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    payment: string;


}