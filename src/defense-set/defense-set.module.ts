import { Module } from '@nestjs/common';
import { DefenseSetService } from './defense-set.service';
import { DefenseSetController } from './defense-set.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DefenseSetSchema } from './schemas/defense-set.schema';
import { ResourceOwnerGuard } from 'src/common/guards/resource-owner.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'DefenseSet', schema: DefenseSetSchema }])
  ],
  controllers: [
    DefenseSetController
  ],
  providers: [
    DefenseSetService,
    ResourceOwnerGuard,
  ],
})
export class DefenseSetModule { }
