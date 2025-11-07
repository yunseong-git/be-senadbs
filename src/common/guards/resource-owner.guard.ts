import {
  Injectable, CanActivate, ExecutionContext, NotFoundException, ForbiddenException, InternalServerErrorException, Type,
} from '@nestjs/common';
import { Reflector, ModuleRef } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RESOURCE_MODEL_KEY } from '../decorators/check-resource-model.decorator';
import { UserPayload } from 'src/auth/dto/payload.dto';

@Injectable()
export class ResourceOwnerGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private moduleRef: ModuleRef, // DI 컨테이너에 접근하기 위해 ModuleRef 주입
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as UserPayload; // 전역 JwtAuthGuard가 주입
    const id = request.params.id;

    // 1. 컨트롤러의 @CheckResourceModel(DefenseSet) 데코레이터 정보 조회
    const modelClass = this.reflector.get<Type<any>>( //type 인터페이스로 클래스 생성자임을 명시
      RESOURCE_MODEL_KEY,
      context.getHandler(),
    );

    if (!modelClass) {
      throw new InternalServerErrorException(
        'Resource model not specified (@CheckResourceModel).',
      );
    }

    // 2. 모델 클래스 이름으로 실제 Mongoose 모델(Provider)을 동적으로 가져오기
    const modelToken = getModelToken(modelClass.name);
    const model = this.moduleRef.get(modelToken, {
      strict: false,
    }) as Model<any>; // 내가 받아오는건 무조건 mongoose 모델이라고 믿어라

    // 3. DB 조회 및 검증 
    const doc = await model.findById(id).exec();

    if (!doc) {
      throw new NotFoundException(`리소스가 존재 하지 않음`);
    }

    if (!doc.userId || !doc.userId.equals(user.userId)) {
      throw new ForbiddenException('리소스 변경 권한 없음');
    }
    // 4. 조회한 문서를 request 객체에 주입
    request.document = doc;
    return true;
  }
}