import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { DefenseSetService } from './defense-set.service';
import { UpdateDefenseSetDto } from './dto/update-defense-set.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { UserPayload } from 'src/auth/dto/payload.dto';
import { User } from 'src/common/decorators/user.decorator';
import { CreateDefenseSetDto } from './dto/create-defense-set.dto';
import { queryDefenseSetDto } from './dto/query-defense-set.dto';
import { DefenseSet } from './schemas/defense-set.schema';
import { ResourceOwnerGuard } from 'src/common/guards/resource-owner.guard';
import { CheckResourceModel } from 'src/common/decorators/check-resource-model.decorator';
import { Document } from 'src/common/decorators/document.decorator';

import type { DefenseSetDocument } from './schemas/defense-set.schema'

@Controller('defense-set')
export class DefenseSetController {
  constructor(private readonly defenseSetService: DefenseSetService) { }

  /**신규 방어덱셋 작성 */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDto: CreateDefenseSetDto, @User() user: UserPayload) {
    // 서비스 로직에서 user.user_id를 DTO와 조합하여 저장
    return this.defenseSetService.create(createDto, user.userId);
  }

  /**신규 방어덱셋 조회 */
  @Get()
  findAll(@Query() dto: queryDefenseSetDto) {
    return this.defenseSetService.findAll(dto);
  }

  /**모든 방어덱셋 조회 */
  @Get('my')
  findMyGuides(@User() user: UserPayload) {
    return this.defenseSetService.findMyGuides(user.userId);
  }

  /**특정 방어덱셋 조회 */
  @Get('detail/:id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.defenseSetService.findOne(id);
  }

  /**내가 작성한 방어팀셋 수정 */
  @Patch(':id')
  @UseGuards(ResourceOwnerGuard) // 소유권 가드 적용
  @CheckResourceModel(DefenseSet)
  update(@Document() doc: DefenseSetDocument, @Body() dto: UpdateDefenseSetDto) {
    return this.defenseSetService.update(doc, dto);
  }

  /**내가 작성한 방어팀셋 삭제 */
  @Delete(':id')
  @UseGuards(ResourceOwnerGuard) // 소유권 가드 적용
  @CheckResourceModel(DefenseSet)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Document() doc: DefenseSetDocument) {
    // 서비스에서 가이드의 작성자와 userId가 일치하는지 확인
    return this.defenseSetService.remove(doc);
  }
}
