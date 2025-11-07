import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  MaxLength,
  IsEnum,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  ArrayMaxSize,
  IsMongoId,
  IsNumber,
} from 'class-validator';
import { Types } from 'mongoose';

// DeckInfo 내부의 SkillReservation DTO
class SkillReservationDto {
  @IsNumber()
  heroIndex: number;

  @IsNumber()
  skillIndex: number;
}

// DeckInfo DTO
class DeckInfoDto {
  @IsArray()
  @ArrayMinSize(3) // 덱은 3명
  @ArrayMaxSize(3)
  @IsMongoId({ each: true })
  heroes: Types.ObjectId[]; // Hero의 ObjectId 배열

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SkillReservationDto)
  skill_reservation: SkillReservationDto[];
}

// 메인 DTO
export class CreateDefenseSetDto {
  @ValidateNested()
  @Type(() => DeckInfoDto)
  deck: DeckInfoDto;

  @IsString()
  @IsEnum(['속공우선', '내실']) // 스키마 ENUM과 일치
  setting: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  comment?: string;
}