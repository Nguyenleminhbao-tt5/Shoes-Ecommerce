import { SupabaseModule } from "@/database/supabase.module";
import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";







@Module({
    imports: [SupabaseModule],
    providers: [CategoryService],
    exports: [CategoryService]
})
export class CategoryModule{}