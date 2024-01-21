import { BaseDto } from "@/common/dto/base.dto";
import { Expose } from "class-transformer";
import { IsEmpty, IsNotEmpty, IsNumber } from "class-validator";



export class EditCartDto extends BaseDto {

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    qty?: number;

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    amount?: number;

    @IsEmpty()
    status: string;

}