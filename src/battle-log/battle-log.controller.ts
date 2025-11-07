import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { BattleLogService } from './battle-log.service';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { UserPayload } from 'src/auth/dto/payload.dto';
import { CheckResourceModel } from 'src/common/decorators/check-resource-model.decorator';
import { ResourceOwnerGuard } from 'src/common/guards/resource-owner.guard';
import { User } from 'src/common/decorators/user.decorator';
import { BattleLog } from 'src/dev/schemas/battle-log.schema';
import type { BattleLogDocument } from 'src/dev/schemas/battle-log.schema';
import { Document } from 'src/common/decorators/document.decorator';

@Controller('battle-log')
export class BattleLogController {
  constructor(private readonly battleLogService: BattleLogService) { }

  /**신규 방어덱셋 작성 */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDto: CreateBattleLogDto, @User() user: UserPayload) {
    // 서비스 로직에서 user.user_id를 DTO와 조합하여 저장
    return this.battleLogService.create(createDto, user.userId);
  }

  /**신규 방어덱셋 조회 */
  @Get()
  findAll(@Query() dto: QuerybattleLogDto) {
    return this.battleLogService.findAll(dto);
  }

  /**모든 방어덱셋 조회 */
  @Get('my')
  findMyGuides(@User() user: UserPayload) {
    return this.battleLogService.findMyGuides(user.userId);
  }

  /**특정 방어덱셋 조회 */
  @Get('detail/:id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.battleLogService.findOne(id);
  }

  /**내가 작성한 배틀로그 수정 */
  @Patch(':id')
  @UseGuards(ResourceOwnerGuard) // 소유권 가드 적용
  @CheckResourceModel(BattleLog)
  update(@Document() doc: BattleLogDocument, @Body() dto: UpdatebattleLogDto) {
    return this.battleLogService.update(doc, dto);
  }

  /**내가 작성한 방어팀셋 삭제 */
  @Delete(':id')
  @UseGuards(ResourceOwnerGuard) // 소유권 가드 적용
  @CheckResourceModel(BattleLog)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Document() doc: BattleLogDocument) {
    // 서비스에서 가이드의 작성자와 userId가 일치하는지 확인
    return this.battleLogService.remove(doc);
  }
}
