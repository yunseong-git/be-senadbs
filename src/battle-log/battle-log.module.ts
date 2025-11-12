import { Module } from '@nestjs/common';
import { BattleLogService } from './battle-log.service';
import { BattleLogController } from './battle-log.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BattleLogSchema } from './schemas/battle-log.schema';
import { StatsModule } from 'src/stats/stats.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'BattleLog', schema: BattleLogSchema }]),
    StatsModule
  ],
  controllers: [BattleLogController],
  providers: [BattleLogService],
})
export class BattleLogModule { }
