import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationGuard } from '../auth/guard/auth.guard';
import { ProductService } from './products.service';
import { ProductDto } from './dto/product.dto';

@UseGuards(AuthenticationGuard)
@Controller('/api/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts() {
    try {
      const response = await this.productService.getAllProducts();
      return response;
    } catch (err) {
      throw err;
    }
  }

  @Post()
  async createProduct(@Body() newProduct: ProductDto) {
    try {
      newProduct = ProductDto.plainToClass(newProduct);
      const response = await this.productService.createProduct(newProduct);
      return response;
    } catch (err) {
      throw err;
    }
  }

  @Get(':id')
  async showProduct(@Param('id') product_id: string) {
    try {
      const response = await this.productService.showProduct(product_id);
      return response;
    } catch (err) {
      throw err;
    }
  }

  @Put(':id')
  async updateProduct(
    @Param('id') product_id: string,
    @Body() editProduct: ProductDto,
  ) {
    try {
      const response = await this.productService.updateProduct(
        product_id,
        editProduct,
      );
      return response;
    } catch (err) {
      throw err;
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') product_id: string) {
    try {
      const response = await this.productService.deleteProduct(product_id);
      return response;
    } catch (err) {
      throw err;
    }
  }
}
