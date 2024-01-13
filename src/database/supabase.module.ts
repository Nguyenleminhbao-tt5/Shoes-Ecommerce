import { Global, Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { LoggerModule } from '@/modules/logger/logger.module';


@Global()
@Module({
  imports: [LoggerModule],
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}
