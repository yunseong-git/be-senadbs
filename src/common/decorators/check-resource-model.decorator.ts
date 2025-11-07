import { SetMetadata } from '@nestjs/common';

export const RESOURCE_MODEL_KEY = 'resourceModel';

/**
 * ResourceOwnerGuard가 조회할 Mongoose 모델 클래스를 지정합니다.
 * @example @CheckResourceModel(DefenseSet)
 */
export const CheckResourceModel = (model: any) =>
  SetMetadata(RESOURCE_MODEL_KEY, model);