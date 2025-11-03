import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
/**
 * Role(s) 메타데이터를 설정합니다.
 * @example @Roles('admin')
 * @example @Roles('admin', 'manager')
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);