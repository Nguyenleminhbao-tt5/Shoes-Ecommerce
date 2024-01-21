import { Module } from "@nestjs/common";
import { PaymentService } from "./payments.service";
import { SupabaseModule } from "@/database/supabase.module";
import { PaymentController } from "./payments.controller";





@Module({
    imports: [SupabaseModule],
    controllers: [PaymentController],
    providers: [PaymentService],
    exports: [PaymentService]
})
export class PaymentModule {}