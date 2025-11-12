import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SkillType } from 'src/common/enums/hero.enum';

// 1. Skill 스키마에 대응하는 DTO
export class SkillDto {
  @IsEnum(SkillType)
  skillIndex: SkillType;

  @IsString()
  @IsNotEmpty()
  description: string;
}

// 2. 메인 DTO
export class CreateHeroDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  rank: string; // (예: 전설)

  @IsString()
  @IsNotEmpty()
  type: string; // (예: 방어형)

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillDto) // 👈 중첩된 클래스(배열) 유효성 검사
  skills: SkillDto[];
}