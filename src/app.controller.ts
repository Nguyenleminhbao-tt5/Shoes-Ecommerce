import { Controller, Get, HttpStatus } from "@nestjs/common";
import { STATUS_CODES } from "http";



@Controller()
export class AppControler{
    
    @Get()
    async getHello(){
        return {
            code: HttpStatus.OK,
            type: "Success",
            data: "Welcome to Shoes Ecommerce"
        }
    }
}