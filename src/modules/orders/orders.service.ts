import { IResponse } from "@/common/interfaces/response.interface";
import { SupabaseService } from "@/database/supabase.service";
import { HttpStatus, Injectable } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";
import { OrderDto } from "./dto/order.dto";
import { PaymentMethod, TransactionDto } from "./dto/transaction.dto";
import { UserService } from "../users/users.service";
import { CartService } from "../carts/carts.service";
import { StatusCart } from "../carts/dto/statusCart.dto";
import { UserDto } from "../users/dto/user.dto";
import { StatusOrder } from "./dto/StatusOrder.dto";
import { PaymentService } from "../payments/payments.service";



@Injectable()
export class OrderService{
    private supabase: SupabaseClient;
    constructor(private readonly supabaseService:SupabaseService,
        private readonly userService:UserService,
        private readonly cartService:CartService,
        private readonly paymentService:PaymentService    
    ){
        if(this.supabaseService) {
            this.supabase = supabaseService.connection();
        }
        else console.log('connect supabase failed');
    }

    async getAllOrders() {
        try{
            const { data, error } = await this.supabase.from('orders').select();
            return {
                code: HttpStatus.OK,
                type: "Success",
                data: data
            };
        }
        catch(error){
            return {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                type: 'Error',
                data: "Get all orders failed"
            } as IResponse
        }
    }

    async getCarts(list_cart: string[]){
        try{
            let qty:number =0;
            let amount:number =0;
            const carts = await Promise.all(list_cart.map(async(item)=>{
                const cartItem = (await this.cartService.updateCart(item,{
                    status: StatusCart.BOUGHT
                } )).data;
                qty+=  cartItem.qty;
                amount += cartItem.amount;
                return cartItem;
            }))

            return {
                carts,
                qty,
                amount
            }
        }
        catch(error){
            throw error;
        }
    }
 
    async createOrder(user_id:string, newOrder: OrderDto){
        try{
            
            const user = (await this.userService.showUser(user_id)).data as UserDto ; 
            const {list_cart, payment } = newOrder;
            const carts = await this.getCarts(list_cart);

            const newTransaction: TransactionDto = {
                user_name: user.first_name + user.last_name,
                user_phone: newOrder.user_phone,
                user_email: user.email,
                user_address: newOrder.user_address,
                amount: carts.amount,
                payment: newOrder.payment,
              
            }
            const transaction = (await this.createTransaction(newTransaction)).data;
            let new_order = {
                user_id,
                qty: carts.qty,
                amount: carts.amount,
                transaction_id: transaction.id,
                cart_list: list_cart,
                status: "",
            }
            
            console.log(payment,PaymentMethod.MOMO)
            
            if(payment == PaymentMethod.MOMO ){
                const resultMomo = await this.paymentService.paymentWithMomo(carts.amount);
                console.log(resultMomo)
                new_order = {
                    ...new_order,
                    status: StatusOrder.PAID,
                }
            }
            else // PaymentMethod.CASH 
            {
                new_order = {
                    ...new_order,
                    status: StatusOrder.UNPAID
                }
            }
            
            const { data, error } = await this.supabase
            .from('orders')
            .insert(new_order)
            .select(`*, transaction: transaction_id(user_name, user_phone, user_address, payment)`);

            delete data[0].transaction_id;
            delete data[0].cart_list;

            const resultOrder = {
                ... data[0],
                carts: carts.carts,
            }
            if(!error) return{
                code: HttpStatus.OK,
                type: 'Success',
                data: resultOrder
            } as IResponse
            return error;
        }
        catch(error){
            console.log(error)
            return {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                type: 'Error',
                data: "Create order failed"
            } as IResponse
        }
    }


    async deleteOrder(order_id: string){
        try{

            const {data: order} = await this.supabase
            .from('orders')
            .select('*')
            .eq('id', order_id)
            .single()

            const {data, error } = await this.supabase
                .from('orders')
                .delete()
                .eq('id', order_id)
            
            await this.deleteTransaction(order.transaction_id)
                
            
            if(!error) 
                return {
                    code: HttpStatus.OK,
                    type: 'Success',
                    data: "Delete user successfully"
                } as IResponse
        }
        catch(error){
            return {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                type: 'Error',
                data: "Delete order failed"
            } as IResponse
        }
    }

    async showOrder(order_id: string){
        try{
            const {data, error} = await this.supabase
            .from('orders')
            .select('*')
            .eq('id', order_id)
            .single()

            if(data) {
                return {
                    code: HttpStatus.OK,
                    type: 'Success',
                    data: data
                } as IResponse
            }
            
            else {
                return {
                    code: HttpStatus.BAD_REQUEST,
                    type: 'Error',
                    data: "Order not exists"
                } as IResponse
            }
        }
        catch(error){
            return {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                type: 'Error',
                data: "Show order failed"
            } as IResponse
        }
    }

    async createTransaction(newTransaction: TransactionDto){
        try{
            const { data, error } = await this.supabase
            .from('transactions')
            .insert(newTransaction)
            .select();
            if(!error) return{
                code: HttpStatus.OK,
                type: 'Success',
                data: data[0]
            } as IResponse
        }
        catch(error){
            return {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                type: 'Error',
                data: "Create transaction failed"
            } as IResponse
        }
    }

    async deleteTransaction(transaction_id: string){
        try{
            const { error } = await this.supabase
                .from('transactions')
                .delete()
                .eq('id', transaction_id)
            if(!error) 
                return {
                    code: HttpStatus.OK,
                    type: 'Success',
                    data: "Delete transaction successfully"
                } as IResponse
        }
        catch(error){
            return {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                type: 'Error',
                data: "Delete transaction failed"
            } as IResponse
        }
    }

    
}