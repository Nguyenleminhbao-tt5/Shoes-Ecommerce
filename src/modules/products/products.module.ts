import { Module } from "@nestjs/common";
import { ProductService } from "./products.service";
import { SupabaseModule } from "@/database/supabase.module";
import { ProductController } from "./products.controller";
import { CategoryModule } from "../categories/category.module";
import { UploadModule } from "../upload/upload.module";




@Module(
    {
        imports:[SupabaseModule, CategoryModule, UploadModule],
        controllers: [ProductController],
        providers:[ProductService],
    }
)
export class ProductModule {

}