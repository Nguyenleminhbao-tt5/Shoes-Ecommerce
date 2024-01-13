import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { UserDto } from "./dto/user.dto";
import { AuthenticationGuard } from "../auth/guard/auth.guard";


@Controller('/api/v1/users')
export class UserController {
    constructor(private readonly userService: UserService){
    }

    // get user_id from authen : @Req() request: Request, request.user_id
    @UseGuards(AuthenticationGuard)
    @Get()
    async getAllUsers(){
        return await  this.userService.getAllUsers();
    }

    @Post()
    async createUser(@Body() newUser: UserDto ){
        return await this.userService.createUser(newUser);
    }

    @Get(':id')
    async showUser(@Param('id') user_id: string){
        return this.userService.showUser(user_id);
    }

    @Put(':id')
    async updateUser(@Param('id') user_id: string, @Body() editUser: UserDto){
        return this.userService.updateUser(user_id, editUser);
    }

    @Delete(':id')
    async deleteUser(@Param('id') user_id: string){
        return this.userService.deleteUser(user_id);
    }

    
}