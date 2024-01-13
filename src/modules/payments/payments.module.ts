import { Module } from "@nestjs/common";
import { PaymentsController } from "./payments.controller";
import { PaymentService } from "./payments.service";





@Module({
    controllers:[PaymentsController],
    providers: [PaymentService]
})
export class PaymentModule {}