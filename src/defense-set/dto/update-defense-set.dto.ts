import { PartialType } from '@nestjs/mapped-types';
import { CreateDefenseSetDto } from './create-defense-set.dto';

// Create DTO의 모든 필드를 선택적(optional)으로 변경
export class UpdateDefenseSetDto extends PartialType(
  CreateDefenseSetDto,
) { }