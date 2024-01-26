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
import { AppControler } from './app.controller';


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
  controllers: [AppControler],
  providers: [],
})
export class AppModule {}
