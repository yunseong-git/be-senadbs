import { Module } from '@nestjs/common';
import { StatsService } from './services/stats.service';
import { StatsController } from './stats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroesMatchStatSchema } from './schemas/heroes-match-stats.schema';
import { SkillsMatchStatSchema } from './schemas/skills-match-stat.schema';
import { StatsQueryService } from './services/stats-query.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'HeroesMatchStat', schema: HeroesMatchStatSchema },
      { name: 'SkillsMatchStat', schema: SkillsMatchStatSchema },
    ]),
  ],
  controllers: [StatsController],
  providers: [StatsService, StatsQueryService],
  exports: [StatsService],
})
export class StatsModule { }
