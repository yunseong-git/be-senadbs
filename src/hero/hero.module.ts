import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroController } from './controllers/hero.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroSchema } from './schemas/hero.schema';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { HeroAdminController } from './controllers/hero-admin.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Hero', schema: HeroSchema }])
  ],
  controllers: [
    HeroController,
    HeroAdminController
  ],
  providers: [
    HeroService,
    RolesGuard
  ],
})
export class HeroModule { }
