import { Module } from "@nestjs/common";
import { CartController } from "./carts.controller";




@Module({
    providers:[],
    controllers:[CartController],
})

export class CartModule{}