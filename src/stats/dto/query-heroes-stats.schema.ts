import { IsArray, ArrayMinSize, ArrayMaxSize, IsMongoId, } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetHeroesStatsQueryDto {
  /** , 로 구분된 3개의 영웅 ObjectId 문자열 ex) ?heroes=id1,id2,id3 */
  @Transform(({ value }) => value.split(',')) // 1. 콤마(,) 기준 배열로 변환
  @IsArray()
  @ArrayMinSize(3)
  @ArrayMaxSize(3)
  @IsMongoId({ each: true, message: '모든 영웅 ID는 유효한 Mongo ID여야 합니다.' })
  heroes: string[]; // 서비스에서 정렬 및 ObjectId로 변환
}