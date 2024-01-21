import { Module } from "@nestjs/common";
import { CartController } from "./carts.controller";
import { CartService } from "./carts.service";
import { SupabaseModule } from "@/database/supabase.module";



@Module({
    imports: [SupabaseModule],
    controllers:[CartController],
    providers: [CartService],
    exports: [CartService]
})

export class CartModule{}