import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';
import { BattleEvaluation, BattleResult, BattleSpeed } from '../schemas/battle-log.enum';

class SkillReservationDto {
  @IsMongoId()
  heroId: Types.ObjectId;

  @IsNumber()
  skillIndex: number;
}

export class DeckInfoDto {
  @IsArray()
  @ArrayMinSize(3)
  @ArrayMaxSize(3)
  @IsMongoId({ each: true, message: '각 영웅 ID는 유효한 Mongo ID여야 합니다.' })
  heroes: Types.ObjectId[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillReservationDto)
  @IsOptional()
  skillReservation?: SkillReservationDto[];
}

export class CreateBattleLogDto {
  @IsNumber()
  version: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DeckInfoDto)
  defenseDeck: DeckInfoDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DeckInfoDto)
  attackDeck: DeckInfoDto;

  @IsOptional()
  @IsEnum(BattleSpeed)
  speed?: BattleSpeed;

  @IsNotEmpty()
  @IsEnum(BattleResult)
  result: BattleResult;

  @IsOptional()
  @IsEnum(BattleEvaluation)
  evaluation?: BattleEvaluation;
}