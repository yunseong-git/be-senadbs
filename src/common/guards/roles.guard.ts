import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserPayload } from 'src/auth/dto/payload.dto';

@Injectable()
export class RolesGuard implements CanActivate { // 1. 'extends' 제거
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    // @Roles() 데코레이터 값 확인
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // @Roles()가 없으면 통과
    if (!requiredRoles) {
      return true;
    }

    // 전역 가드가 이미 유저 정보를 주입했으므로 바로 사용
    const { user } = context.switchToHttp().getRequest() as { user: UserPayload };

    // 롤 검사
    return requiredRoles.some((role) => user.role === role);
  }
}