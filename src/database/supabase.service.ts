import { LoggerService } from "@/modules/logger/logger.service";
import { Injectable } from "@nestjs/common";
import { createClient, SupabaseClient } from '@supabase/supabase-js';




@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;
  constructor( private readonly logger: LoggerService) {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_API_KEY,
    );
    if(this.supabase){
      this.logger.log('[InstanceDatabase] Connect supabase successfully')
    }
  }
  connection() {
    return this.supabase;
  }
}