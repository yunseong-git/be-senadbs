import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { BattleLogService } from './battle-log.service';
import { CreateBattleLogDto } from './dto/create-battle-log.dto';
import { User } from 'src/common/decorators/user.decorator';
import { UserPayload } from 'src/auth/dto/payload.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('battle-log')
export class BattleLogController {
  constructor(private readonly battleLogService: BattleLogService) { }

  /**
   * 신규 배틀로그 1건 작성
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    createDto: CreateBattleLogDto,
    @User() user: UserPayload,
  ) {
    return this.battleLogService.create(createDto, user.userId);
  }

  /**
   * 💻 (개발용) 배틀로그 대량 생성
   */
  @Post('bulk')
  @HttpCode(HttpStatus.CREATED)
  createBulk(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    createDtos: CreateBattleLogDto[],
    @User() user: UserPayload,
  ) {
    return this.battleLogService.createBulk(createDtos, user.userId);
  }
}