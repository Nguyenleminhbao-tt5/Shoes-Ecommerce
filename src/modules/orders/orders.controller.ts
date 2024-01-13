import { Controller } from "@nestjs/common";
import { OrderService } from "./orders.service";



@Controller('/api/v1/orders')
export class OrderController {
    constructor(private readonly cartService: OrderService){
    }
}