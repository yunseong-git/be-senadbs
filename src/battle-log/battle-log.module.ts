import { Module } from '@nestjs/common';
import { BattleLogService } from './battle-log.service';
import { BattleLogController } from './battle-log.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BattleLogSchema } from './schemas/battle-log.schema';
import { StatsModule } from 'src/stats/stats.module';
import { ResourceOwnerGuard } from 'src/common/guards/resource-owner.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'BattleLog', schema: BattleLogSchema }]),
    StatsModule
  ],
  controllers: [BattleLogController],
  providers: [
    BattleLogService,
    ResourceOwnerGuard,
    RolesGuard
  ],
})
export class BattleLogModule { }
