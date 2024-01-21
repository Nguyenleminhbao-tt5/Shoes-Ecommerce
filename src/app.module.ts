import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  AuthModule,
  CartModule,
  LoggerModule,
  ProductModule,
  UsersModule,
  OrderModule,
  PaymentModule
} from './modules';


@Module({
  imports: [
    LoggerModule,
    UsersModule,
    AuthModule,
    ProductModule,
    CartModule,
    OrderModule,
    PaymentModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
