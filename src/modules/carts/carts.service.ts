import { IResponse } from "@/common/interfaces/response.interface";
import { SupabaseService } from "@/database/supabase.service";
import { HttpStatus, Injectable } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";
import { CartDto } from "./dto/cart.dto";
import { EditCartDto } from "./dto/editCart.dto";
import { StatusCart } from "./dto/statusCart.dto";



@Injectable()
export class CartService{
    private supabase: SupabaseClient;
    constructor(private readonly supabaseService:SupabaseService){
        if(this.supabaseService) {
            this.supabase = supabaseService.connection();
        }
        else console.log('connect supabase failed');
    }

    async getAllCarts() {
        try{
            const { data, error } = await this.supabase.from('carts').select(
                `*, user: user_id(first_name, last_name), product: product_id(product_name)`
            ).eq('status', StatusCart.NOT_BOUGHT);
            return {
                code: HttpStatus.OK,
                type: "Success",
                data: data
            };
        }
        catch(err)
        {
            return {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                type: 'Error',
                data: "Get all carts failed"
            } as IResponse
        }
       
    }

    async createCart(newCart: CartDto){
        try{
            const { data, error } = await this.supabase
            .from('carts')
            .insert(newCart)
            .select();
            if(!error) return{
                code: HttpStatus.OK,
                type: 'Success',
                data: data[0]
            } as IResponse
        }
        catch(err){
            return {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                type: 'Error',
                data: "Create cart failed"
            } as IResponse
        }
    }

    async deleteCart(cart_id:string){
        try{
            const { error } = await this.supabase
            .from('carts')
            .delete()
            .eq('id', cart_id)
        if(!error) 
            return {
                code: HttpStatus.OK,
                type: 'Success',
                data: "Delete cart successfully"
            } as IResponse
        }
        catch(err){
            return {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                type: 'Error',
                data: "Delete cart failed"
            } as IResponse
        }
    }

    async updateCart(cart_id:string, editCart:EditCartDto){
        try{
            const { data, error } = await this.supabase
            .from('carts')
            .update(editCart)
            .eq('id', cart_id)
            .select(`*,  product: product_id(product_name)`);

            if (!error)
                return {
                code: HttpStatus.OK,
                type: 'Success',
                data: data[0],
                } as IResponse;
        }
        catch(err){
            return {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                type: 'Error',
                data: "Update cart failed"
            } as IResponse
        }
    }

    async showCart(cart_id:string){
        try{
            const {data, error} = await this.supabase
            .from('carts')
            .select('*')
            .eq('id', cart_id)
            .select(`*,  product: product_id(product_name)`)
            if(data) {
                return {
                    code: HttpStatus.OK,
                    type: 'Success',
                    data: data[0]
                } as IResponse
            }
            
            else {
                return {
                    code: HttpStatus.BAD_REQUEST,
                    type: 'Error',
                    data: "Cart not exists"
                } as IResponse
            }
        }
        catch(err){
            return {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                type: 'Error',
                data: "Show cart failed"
            } as IResponse
        }
       
    }
}