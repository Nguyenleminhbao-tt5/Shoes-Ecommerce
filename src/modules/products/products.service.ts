import { SupabaseService } from "@/database/supabase.service";
import { Injectable } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";






@Injectable()
export class ProductService {
    private supabase: SupabaseClient;
    constructor(private readonly supabaseService:SupabaseService){
        if(this.supabaseService) {
            console.log('connect supabase successfully');
            this.supabase = supabaseService.connection();
        }
        else console.log('connect supabase failed');
    }

    async getAllProducts() {
        try{

        }
        catch(err){

        }
    }

    async createProduct() {
        try{

        }
        catch(err){
            
        }
    }

    async showProduct() {
        try{

        }
        catch(err){
            
        }
    }

    async updateProduct() {
        try{

        }
        catch(err){
            
        }
    }

    async deleteProduct() {
        try{

        }
        catch(err){
            
        }
    }



    
}