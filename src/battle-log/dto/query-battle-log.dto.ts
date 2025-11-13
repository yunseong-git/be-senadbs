import {
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsMongoId,
  IsOptional,
  IsNumberString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryBattleLogDto {
  @Transform(({ value }) => value.split(',')) // 콤마(,) 기준 배열로 변환
  @IsArray()
  @ArrayMinSize(3)
  @ArrayMaxSize(3)
  @IsMongoId({ each: true, message: '모든 영웅 ID는 유효한 Mongo ID여야 합니다.' })
  heroes: string[];

  @IsOptional()
  @IsNumberString()
  page?: string = '1';

  @IsOptional()
  @IsNumberString()
  limit?: string = '20';
}