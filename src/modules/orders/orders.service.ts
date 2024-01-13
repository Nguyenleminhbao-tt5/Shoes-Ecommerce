import { SupabaseService } from "@/database/supabase.service";
import { Injectable } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";






@Injectable()
export class OrderService{
    private supabase: SupabaseClient;
    constructor(private readonly supabaseService:SupabaseService){
        if(this.supabaseService) {
            console.log('connect supabase successfully');
            this.supabase = supabaseService.connection();
        }
        else console.log('connect supabase failed');
    }

    
}