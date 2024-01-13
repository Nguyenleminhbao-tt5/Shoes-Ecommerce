import { Controller } from "@nestjs/common";
import { CartService } from "./carts.service";



@Controller('/api/v1/carts')
export class CartController {
    constructor(private readonly cartService: CartService){
    }
}