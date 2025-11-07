import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * ResourceOwnerGuard가 검증 후 request에 주입한
 * Mongoose 문서를 가져옵니다.
 * @example update(@Document() doc: DefenseSetDocument)
 */
export const Document = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // 가드가 request.document에 문서를 저장할 것입니다.
    return request.document;
  },
);