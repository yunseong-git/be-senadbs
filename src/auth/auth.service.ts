import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { UserDocument } from 'src/user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, RefreshTokenPayload } from './dto/payload.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  /**유저 회원가입(추후 ouath도입시 변경 필요) */
  async register(dto: CreateUserDto) {
    const user = await this.userService.create(dto)
    return user
  }

  /**유저 로그인(추후 googleouath로 변경) */
  async login(dto: LoginDto) {
    const user = await this.userService.validateUser(dto)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.issueAccessToken(user)
    const refreshToken = await this.issueRefreshToken(user)

    await this.userService.HashingAndStoreRefreshToken(user.id, refreshToken)
    return { accessToken, refreshToken }
  }

  /**토큰 리프레쉬 */
  async tokenRefresh(refreshToken: string) {
    //토큰 유효성 검증
    let payload: RefreshTokenPayload
    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      });
    } catch (e) {
      throw new UnauthorizedException('Invalid Refresh Token');
    }
    //DB조회
    const user = await this.userService.findById(payload.sub);
    if (!user || !user.currentHashedRefreshToken) {
      throw new UnauthorizedException('Access Denied1');
    }
    //RT 비교
    const isMatch = await bcrypt.compare(refreshToken, user.currentHashedRefreshToken,);
    if (!isMatch) {
      throw new UnauthorizedException('Access Denied2');
    }
    //new AT 발급
    const newAccessToken = await this.issueAccessToken(user);
    return newAccessToken;
  }

  //accessToken 발급
  private async issueAccessToken(user: UserDocument) {
    const payload = {
      sub: user.id,
      nickname: user.nickname,
      role: user.role,
    }
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.getOrThrow<number>('JWT_ACCESS_EXPIRATION'),
    })
    return accessToken
  }

  //refreshToken 발급
  private async issueRefreshToken(user: UserDocument) {
    const payload = {
      sub: user.id,
    }
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.getOrThrow<number>('JWT_REFRESH_EXPIRATION'),
    })

    return refreshToken;
  }
}
