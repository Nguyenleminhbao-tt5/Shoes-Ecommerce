import { Module } from '@nestjs/common';
import { LoggerModule } from './modules/logger/logger.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [LoggerModule, UsersModule, AuthModule, CommonModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
