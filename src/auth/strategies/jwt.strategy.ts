import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Types } from 'mongoose';
import { JwtPayload, UserPayload } from '../dto/payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      //우선은 테스트니깐 헤더에서 추출(실서비스에서는 cookie-parser을 통해 쿠키추출)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
    });
  }

  /** Guard 통과 시 실행되는 validate(토큰 서명 및 만료일 검증은 Passport 단에서 이미 완료됨)*/
  async validate(payload: JwtPayload): Promise<UserPayload> {
    //payload 신뢰
    return {
      userId: new Types.ObjectId(payload.sub),
      nickname: payload.nickname,
      role: payload.role,
    };
  }
}