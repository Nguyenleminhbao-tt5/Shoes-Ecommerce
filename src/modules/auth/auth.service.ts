import { SupabaseService } from '@/database/supabase.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { IResponse } from '@/common/interfaces/response.interface';
import { LoginDto, AuthDto } from './dto';
import * as argon from 'argon2';
import { IUser } from '../users/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly jwtService: JwtService,
  ) {
    if (this.supabaseService) {
      this.supabase = supabaseService.connection();
    } else console.log('connect supabase failed');
  }

  async authentication(email: string, password: string) {
    try {
      let { data } = await this.supabase
        .from('users')
        .select()
        .eq('email', email)
        .single();

      if (!data) {
        return {
          code: HttpStatus.BAD_REQUEST,
          type: 'Error',
          data: 'User not found',
        };
      } else {
        let user = data as IUser;
        const checkPassword = await argon.verify(user.password, password);
        if (checkPassword) {
          return user;
        } else {
          return {
            code: HttpStatus.BAD_REQUEST,
            type: 'Error',
            data: 'Please enter correctly password',
          };
        }
      }
    } catch (err) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'Error',
        data: 'Login  failed',
      } as IResponse;
    }
  }

  async login(userInfo: IUser) {
    try {
      userInfo = {
        ...userInfo,
        accessToken: await this.convertToJwtString(userInfo.id),
      };
      delete userInfo.password;
      return {
        code: HttpStatus.OK,
        type: 'Success',
        data: userInfo,
      };
    } catch (err) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'Error',
        data: 'Login  failed',
      } as IResponse;
    }
  }

  async signUp(userInfo: AuthDto) {
    try {
      const { data: checkUser } = await this.supabase
        .from('users')
        .select('*')
        .eq('email', userInfo.email)
        .single();

      if (checkUser) {
        return {
          code: HttpStatus.BAD_REQUEST,
          type: 'Error',
          data: 'User already Exists',
        };
      } else {
        const { data, error } = await this.supabase
          .from('users')
          .insert(userInfo)
          .select();
        if (!error) {
          let user = data[0] as IUser;
          user = {
            ...user,
            accessToken: await this.convertToJwtString(user.id),
          };
          delete data[0].password;
          return {
            code: HttpStatus.OK,
            type: 'Success',
            data: user,
          } as IResponse;
        }
      }
    } catch (err) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'Error',
        data: 'Create user failed',
      } as IResponse;
    }
  }

  async logout() {
    return 'logout';
  }

  async convertToJwtString(user_id: string) {
    const payload = {
      user_id,
    };

    return await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret: `${process.env.SECRET_JWT}`,
    });
  }
}
