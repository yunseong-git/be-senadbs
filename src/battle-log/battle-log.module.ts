import { Module } from '@nestjs/common';
import { BattleLogService } from './battle-log.service';
import { BattleLogController } from './battle-log.controller';

@Module({
  controllers: [BattleLogController],
  providers: [BattleLogService],
})
export class BattleLogModule {}
