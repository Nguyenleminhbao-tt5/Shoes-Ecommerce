import { Module } from '@nestjs/common';
import { LoggerModule } from './modules/logger/logger.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './modules/products/products.module';
import { CategoryModule } from './modules/categories/category.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [LoggerModule, UsersModule, AuthModule, ProductModule, UploadModule, CategoryModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
