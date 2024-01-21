import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CartService } from './carts.service';
import { AuthenticationGuard } from '../auth/guard/auth.guard';
import { CartDto } from './dto/cart.dto';
import { Request } from 'express';
import { EditCartDto } from './dto/editCart.dto';

@UseGuards(AuthenticationGuard)
@Controller('/api/v1/carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}



  @Get()
  async getAllCarts() {
    try {
      const response = await this.cartService.getAllCarts();
      return response;
    } catch (err) {
      throw err;
    }
  }

  @Post()
  async createCart(@Req() request: Request, @Body() newCart: CartDto) {
    try {

      newCart = CartDto.plainToClass(newCart);
      newCart.user_id = request.user as string;
      const response = await this.cartService.createCart(newCart);
      return response;
    } catch (err) {
      throw err;
    }
  }

  @Get(':id')
  async showCart(@Param('id') cart_id: string) {
    try {
      const response = await this.cartService.showCart(cart_id);
      return response;
    } catch (err) {
      throw err;
    }
  }

  @Put(':id')
  async updateCart(
    @Param('id') cart_id: string,
    @Body() editCart: any,
  ) {
    try {
      editCart = EditCartDto.plainToClass(editCart);
      const response = await this.cartService.updateCart(
        cart_id,
        editCart,
      );
      return response;
    } catch (err) {
      throw err;
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') cart_id: string) {
    try {
      const response = await this.cartService.deleteCart(cart_id);
      return response;
    } catch (err) {
      throw err;
    }
  }
}
