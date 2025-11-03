import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { UserPayload } from './dto/payload.dto';
import { User } from 'src/common/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Public()
  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    const user = await this.authService.register(dto);
    return user;
  }

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const tokens = await this.authService.login(dto);
    return tokens;
  }

  @Public()
  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    const newAccessToken = await this.authService.tokenRefresh(refreshToken);
    return newAccessToken;
  }

  @Get('profile')
  getProfile(@User() user: UserPayload) {
    return `Welcome ${user.nickname}`;
  }

  //로그아웃은 추후 클라이언트와 동시개발
}
