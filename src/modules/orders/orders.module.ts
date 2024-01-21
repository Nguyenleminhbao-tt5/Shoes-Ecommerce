import { Module } from "@nestjs/common";
import { OrderController } from "./orders.controller";
import { OrderService } from "./orders.service";
import { SupabaseModule } from "@/database/supabase.module";
import { UsersModule } from "../users/users.module";
import { CartModule } from "../carts/carts.module";
import { PaymentModule } from "../payments/payments.module";




@Module({
    imports: [SupabaseModule, UsersModule, CartModule, PaymentModule],
    controllers:[OrderController],
    providers:[OrderService],
})

export class OrderModule{}