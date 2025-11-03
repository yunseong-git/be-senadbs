// src/common/decorators/user.decorator.ts (신규 생성)

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from 'src/auth/dto/payload.dto';
/**
 * Request 객체에서 user 정보를 추출 (JwtStrategy의 validate 반환 값)
 * @example
 * someMethod(@User() user: UserPayload) { ... }
 * someMethod(@User('user_id') userId: Types.ObjectId) { ... }
 */
export const User = createParamDecorator(
  (data: keyof UserPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as UserPayload; // JwtStrategy.validate()가 반환한 객체

    return data ? user?.[data] : user;
  },
);