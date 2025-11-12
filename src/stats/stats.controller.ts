import { Controller, Get, Param, Query } from '@nestjs/common';
import { StatsQueryService } from './services/stats-query.service';
import { Public } from 'src/common/decorators/public.decorator';
import { GetHeroesStatsQueryDto } from './dto/query-heroes-stats.schema';
import { HeroesStatsResponse, SkillsStatsResponse } from './types/query-response.type';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsQueryService: StatsQueryService) { }
  @Public()
  @Get('heroes')
  async getHeoresMatchStats(@Query() query: GetHeroesStatsQueryDto): Promise<HeroesStatsResponse[]> {
    return await this.statsQueryService.getHeroesMatchStats(query);
  }

  @Public()
  @Get('skills/:heroesMatchStatId')
  async getSkillsMatchStats(@Param('heroesMatchStatId', ParseObjectIdPipe) id: string): Promise<SkillsStatsResponse[]> {
    return await this.statsQueryService.getSkillsMatchStats(id);
  }
}
