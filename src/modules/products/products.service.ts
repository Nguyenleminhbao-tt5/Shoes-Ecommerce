import { IResponse } from '@/common/interfaces/response.interface';
import { SupabaseService } from '@/database/supabase.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { ProductDto } from './dto/product.dto';
import { CategoryService } from '../categories/category.service';

@Injectable()
export class ProductService {
  private supabase: SupabaseClient;
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly categoryService: CategoryService,
  ) {
    if (this.supabaseService) {
      this.supabase = supabaseService.connection();
    } else console.log('connect supabase failed');
  }

  async getAllProducts() {
    try {
      const { data, error } = await this.supabase.from('products').select();
      return {
        code: HttpStatus.OK,
        type: 'Success',
        data: data,
      };
    } catch (err) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'Error',
        data: 'Get all users failed',
      } as IResponse;
    }
  }

  async createProduct(newProduct: ProductDto) {
    try {
      const { data: checkProduct } = await this.supabase
        .from('products')
        .select('*')
        .eq('product_name', newProduct.product_name)
        .single();

      if (checkProduct) {
        return {
          code: HttpStatus.BAD_REQUEST,
          type: 'Error',
          data: 'Product already Exists',
        };
      } else {
        const { category_name } = newProduct;
        const categoryResponse =
          await this.categoryService.findCategory(category_name);
        delete newProduct.category_name;
        const new_product = {
          ...newProduct,
          category_id: categoryResponse.data,
        };
        const { data, error } = await this.supabase
          .from('products')
          .insert(new_product)
          .select();
        if (!error)
          return {
            code: HttpStatus.OK,
            type: 'Success',
            data: data[0],
          } as IResponse;
      }
    } catch (err) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'Error',
        data: 'Create product failed',
      } as IResponse;
    }
  }

  async showProduct(product_id: string) {
    try {
      const { data, error } = await this.supabase
        .from('products')
        .select(`*, category_name: category_id(category_name)`)
        .eq('id', product_id)
        .single();
      if (data) {
        return {
          code: HttpStatus.OK,
          type: 'Success',
          data: data,
        } as IResponse;
      } else {
        return {
          code: HttpStatus.BAD_REQUEST,
          type: 'Error',
          data: 'Product not exists',
        } as IResponse;
      }
    } catch (err) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'Error',
        data: 'Show product failed',
      } as IResponse;
    }
  }

  async updateProduct(product_id: string, editProduct: ProductDto) {
    try {
      const { category_name } = editProduct;
      const categoryResponse =
        await this.categoryService.findCategory(category_name);
      delete editProduct.category_name;
      const edit_product = {
        ...editProduct,
        category_id: categoryResponse.data,
      };
      const { data, error } = await this.supabase
        .from('products')
        .update(edit_product)
        .eq('id', product_id)
        .select();

      if (!error)
        return {
          code: HttpStatus.OK,
          type: 'Success',
          data: data[0],
        } as IResponse;
    } catch (err) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'Error',
        data: 'Update product failed',
      } as IResponse;
    }
  }

  async deleteProduct(product_id: string) {
    try {
      const { error } = await this.supabase
        .from('products')
        .delete()
        .eq('id', product_id);
      if (!error)
        return {
          code: HttpStatus.OK,
          type: 'Success',
          data: 'Delete product successfully',
        } as IResponse;
    } catch (err) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'Error',
        data: 'Delete product failed',
      } as IResponse;
    }
  }
}
