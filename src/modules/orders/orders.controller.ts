import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { OrderService } from "./orders.service";
import { AuthenticationGuard } from "../auth/guard/auth.guard";
import { OrderDto } from "./dto/order.dto";
import { Request } from "express";


@UseGuards(AuthenticationGuard)
@Controller('/api/v1/orders')
export class OrderController {
    constructor(private readonly orderService: OrderService){
    }

    @Get()
    async getAllOrders() {
        try{
            const response = await this.orderService.getAllOrders();
            return response;
        }
        catch(error){
            throw error;
        }
    }

    @Post()
    async createOrder(@Req() request: Request, @Body() list_cart: OrderDto){
        try{
            const user_id = request.user as string;
            const response = await this.orderService.createOrder(user_id, list_cart);
            return response;
        }
        catch(error){
            throw error;
        }
    }

    @Delete(':id')
    async deleteOrder(@Param('id') order_id: string){
        try{
            const response = await this.orderService.deleteOrder(order_id);
            return response;
        }
        catch(error){
            throw error;
        }
    }

    @Get(':id')
    async showOrder(@Param('id') order_id: string){
        try{
            const response = await this.orderService.showOrder(order_id);
            return response;
        }
        catch(error){
            throw error;
        }
    }
}