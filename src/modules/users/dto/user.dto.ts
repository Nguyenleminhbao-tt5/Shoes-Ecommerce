import { IsDataURI, IsEmail, IsNotEmpty, Length } from "class-validator";



export class UserDto {
    @IsNotEmpty()
    @Length(3,20)
    first_name: string;
    @IsNotEmpty()
    @Length(3,20)
    last_name: string;
    @IsNotEmpty()
    @IsEmail()
    @Length(10,20)
    email: string;
    @IsNotEmpty()
    @Length(6,12)
    password: string;
   // @IsDataURI()
    avatar: string;
}