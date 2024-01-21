import { Controller, Get, UseGuards } from "@nestjs/common";
import { PaymentService } from "./payments.service";
import { AuthenticationGuard } from "../auth/guard/auth.guard";





@UseGuards(AuthenticationGuard)
@Controller('/api/v1/payments')
export class PaymentController{
    constructor(private readonly paymentService: PaymentService){
        
    }

    @Get()
    async paymentWithMomo(){
        return await this.paymentService.paymentWithMomo(100000);
    }
}