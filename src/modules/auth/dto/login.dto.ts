import { BaseDto } from "@/common/dto/base.dto";
import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";


export class LoginDto extends BaseDto {

    @IsNotEmpty()
    @IsEmail()
    @Length(10,20)
    @Expose()
    @IsString()
    email: string;

    @IsNotEmpty()
    @Length(6,12)
    @Expose()
    @IsString()
    password: string;
}