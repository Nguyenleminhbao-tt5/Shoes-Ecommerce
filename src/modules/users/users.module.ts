import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { LoggerService } from '@/modules/logger/logger.service';
import { SupabaseModule } from '@/database/supabase.module';

@Module({
    imports: [SupabaseModule],
    controllers:[UserController],
    providers:[UserService, LoggerService],

})
export class UsersModule {}
