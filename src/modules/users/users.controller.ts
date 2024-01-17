import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { UserDto } from "./dto/user.dto";
import { AuthenticationGuard } from "../auth/guard/auth.guard";

@UseGuards(AuthenticationGuard)
@Controller('/api/v1/users')
export class UserController {
    constructor(private readonly userService: UserService){
    }

    // get user_id from authen : @Req() request: Request, request.user_id
    
    @Get()
    async getAllUsers(){
        try{
            const response = await  this.userService.getAllUsers();
            return  response;
        }
        catch(err){
            throw err;
        }
       
    }

    @Post()
    async createUser(@Body() newUser: UserDto ){
        try{
            const response = await this.userService.createUser(newUser);
            return response;
        }
        catch(err){
            throw err;
        }
       
    }

    @Get(':id')
    async showUser(@Param('id') user_id: string){
        try{
            const response = await this.userService.showUser(user_id);
            return response;
        }
        catch(err){
            throw err;
        }
        
    }

    @Put(':id')
    async updateUser(@Param('id') user_id: string, @Body() editUser: UserDto){
        try{
            const response = await this.userService.updateUser(user_id, editUser);
            return response;
        }
        catch(err){
            throw err;
        }
       
    }

    @Delete(':id')
    async deleteUser(@Param('id') user_id: string){
        try{
            const response = await this.userService.deleteUser(user_id);
            return response;
        }
        catch(err){
            throw err;
        }
       
    }

    
}