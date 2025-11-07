import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';

export class queryDefenseSetDto {
  @IsOptional()
  @IsEnum(['latest', 'upvotes'])
  sortBy?: 'latest' | 'upvotes' = 'latest'; // 기본값 최신순

  @IsOptional()
  @IsNumberString()
  page?: string = '1';

  @IsOptional()
  @IsNumberString()
  limit?: string = '20';

  @IsOptional()
  @IsString() // @IsMongoId()를 쓸 수도 있습니다.
  heroId?: string; // (선택적) 특정 영웅 ID로 필터링
}