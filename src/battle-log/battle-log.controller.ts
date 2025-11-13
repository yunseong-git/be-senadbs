import { Controller, Post, Body, HttpCode, HttpStatus, Query, Get, Delete, Param, UseGuards, } from '@nestjs/common';
import { BattleLogService } from './battle-log.service';
import { CreateBattleLogBatchDto } from './dto/create-battle-log.dto';
import { User } from 'src/common/decorators/user.decorator';
import { UserPayload } from 'src/auth/dto/payload.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { QueryBattleLogDto } from './dto/query-battle-log.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { ResourceOwnerGuard } from 'src/common/guards/resource-owner.guard';
import { Document } from 'src/common/decorators/document.decorator';
import { CheckResourceModel } from 'src/common/decorators/check-resource-model.decorator';
import { BattleLog } from './schemas/battle-log.schema';
import type { BattleLogDocument } from './schemas/battle-log.schema';

@Controller('battle-log')
export class BattleLogController {
  constructor(private readonly battleLogService: BattleLogService) { }

  /** 배틀로그 쿼리 */
  @Public()
  @Get()
  async findRecent(@Query() query: QueryBattleLogDto) {
    return await this.battleLogService.findByDefenseDeckHeroes(query);
  }

  @Get('my')
  async findMy(@User() user: UserPayload) {
    return await this.battleLogService.findMy(user.userId)
  }

  /**신규 배틀로그 작성*/
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateBattleLogBatchDto, @User() user: UserPayload,) {
    return await this.battleLogService.create(dto, user.userId);
  }

  @Delete(':id')
  @UseGuards(ResourceOwnerGuard)
  @CheckResourceModel(BattleLog)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseObjectIdPipe) id: string, @Document() doc: BattleLogDocument,) {
    return await this.battleLogService.remove(doc);
  }
}