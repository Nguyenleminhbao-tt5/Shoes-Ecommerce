import { Injectable } from "@nestjs/common";
import { SupabaseService } from "@/database/supabase.service";
import { HttpStatus } from "@nestjs/common";
import { IResponse } from "@/common/interfaces/response.interface";
import { SupabaseClient } from "@supabase/supabase-js";
import { UserDto } from "./dto/user.dto";



@Injectable()
export class UserService {

    private supabase: SupabaseClient;
    constructor(private readonly supabaseService: SupabaseService){
        if(this.supabaseService) {
            this.supabase = supabaseService.connection();
        }
        else console.log('connect supabase failed');
      
    }
    async getAllUsers() {
        try{
            const { data, error } = await this.supabase.from('users').select();
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
                data: "Get all users failed"
            } as IResponse
        }
       
    }

    async createUser(newUser: UserDto){
        try{
            const { data, error } = await this.supabase
            .from('users')
            .insert(newUser);
            if(!error) return{
                code: HttpStatus.OK,
                type: 'Success',
                data: 'Create user successfully'
            } as IResponse
        }
        catch(err){
            return {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                type: 'Error',
                data: "Create user failed"
            } as IResponse
        }
    }

    async deleteUser(user_id:string){
        try{
            const { error } = await this.supabase
                .from('users')
                .delete()
                .eq('id', user_id)
            if(!error) 
                return {
                    code: HttpStatus.OK,
                    type: 'Success',
                    data: "Delete user successfully"
                } as IResponse
        }
        catch(err){
            return {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                type: 'Error',
                data: "Delete user failed"
            } as IResponse
        }
    }

    async updateUser(user_id:string, editUser:UserDto){
        try{
            const { error } = await this.supabase
            .from('users')
            .update(editUser)
            .eq('id', user_id)
            if(!error)
                return {
                    code: HttpStatus.OK,
                    type: 'Success',
                    data: "Update user successfully"
                } as IResponse
        }
        catch(err){
            return {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                type: 'Error',
                data: "Update user failed"
            } as IResponse
        }
    }

    async showUser(user_id:string){
        try{
            const {data, error} = await this.supabase
                .from('users')
                .select('*')
                .eq('id', user_id)
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
                    data: "User not exists"
                } as IResponse
            }
        }
        catch(err){
            return {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                type: 'Error',
                data: "Show user failed"
            } as IResponse
        }
       
    }
}