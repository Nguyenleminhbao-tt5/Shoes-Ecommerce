import { Module } from "@nestjs/common";
import { OrderController } from "./orders.controller";




@Module({
    providers:[],
    controllers:[OrderController],
})

export class CartModule{}