import { Controller } from "@nestjs/common";
import { PaymentService } from "./payments.service";






@Controller('/api/v1/payments')
export class PaymentsController{
    constructor(private readonly paymentService: PaymentService){
        
    }
}