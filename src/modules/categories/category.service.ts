import { IResponse } from "@/common/interfaces/response.interface";
import { SupabaseService } from "@/database/supabase.service";
import { HttpStatus, Injectable } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";




@Injectable()
export class CategoryService{
    
    private supabase: SupabaseClient;
    constructor(private readonly supabaseService: SupabaseService){
        if(this.supabaseService) {
            this.supabase = supabaseService.connection();
        }
        else console.log('connect supabase failed');
    }

    async createCategory(category_name:string){
        try{
            const { data, error } = await this.supabase
            .from('categories')
            .insert({category_name})
            .select();
            if(!error) return data[0].id; // TODO: return category_id
        }
        catch(err){
            return {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                type: 'Error',
                data: "Create category failed"
            } as IResponse
        }
    }

    async updateCategory(category_id:string, category_name:string){
        try{
            const { error } = await this.supabase
            .from('users')
            .update({category_name})
            .eq('id', category_id)
            if(!error)
                return {
                    code: HttpStatus.OK,
                    type: 'Success',
                    data: "Update category successfully"
                } as IResponse
        }
        catch(err){
            return {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                type: 'Error',
                data: "Update category failed"
            } as IResponse
        }
    }

    async deleteCategory(category_id: string){
        try{
            const { error } = await this.supabase
                .from('categories')
                .delete()
                .eq('id',category_id)
            if(!error) 
                return {
                    code: HttpStatus.OK,
                    type: 'Success',
                    data: "Delete category successfully"
                } as IResponse
        }
        catch(err){
            return {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                type: 'Error',
                data: "Delete category failed"
            } as IResponse
        }
    }

    async findCategory(category_name:string){
        try{
            let { data } = await this.supabase
            .from('categories')
            .select()
            .eq('category_name', category_name)
            .single();

            if(data)
            {
                return {
                    code: HttpStatus.OK,
                    type: 'Success',
                    data:  data.id // TODO: return category_id If find successfully
                }
                   
            }
            else {
                const category_id = await this.createCategory(category_name);
                return {
                    code: HttpStatus.OK,
                    type: 'Success',
                    data:   category_id // TODO: return new category_id If find not successfully
                }
            }
        }
        catch(err){
            return {
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                type: 'Error',
                data: "Find category failed"
            } as IResponse
        }
    }
}