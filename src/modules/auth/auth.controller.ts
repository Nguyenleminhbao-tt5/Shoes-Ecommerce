import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, LoginDto } from "./dto";
import * as argon from "argon2";
import { Request } from "express";
import { LocalAuthGuard } from "./guard/local.guard";
import { IUser } from "../users/interfaces/user.interface";
import { GoogleOAuthGuard } from "./guard/google.guard";


@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: Request) {
    return this.authService.login(request.user as IUser);
  }

  @UseGuards(GoogleOAuthGuard)
  @Get('google')
  async googleAuth(@Req() request: Request) {}

  @UseGuards(GoogleOAuthGuard)
  @Get('google-redirect')
  googleAuthRedirect(@Req() request: Request) {
    return request.user
  }

  @Post('sign-up')
  async signUp(@Body() userInfo: AuthDto) {
    const hashPassword = await argon.hash(userInfo.password)
    userInfo = {...AuthDto.plainToClass(userInfo), password: hashPassword}
    return this.authService.signUp(userInfo);
  }

  @Get('logout')
  async logout() {
    return this.authService.logout();
  }
}