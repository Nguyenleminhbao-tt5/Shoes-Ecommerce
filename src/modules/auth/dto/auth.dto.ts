import { BaseDto } from "@/common/dto/base.dto";
import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";


export class AuthDto extends BaseDto {
    @IsNotEmpty()
    @Length(3,20)
    @Expose()
    @IsString()
    first_name: string;

    @IsNotEmpty()
    @Length(3,20)
    @Expose()
    @IsString()
    last_name: string;

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