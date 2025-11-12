import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { HeroService } from '../hero.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { UpdateHeroDto } from '../dto/update-hero.dto';

@UseGuards(RolesGuard)
@Roles('admin')
@Controller('hero-admin')
export class HeroAdminController {
  constructor(private readonly heroService: HeroService) {
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createHeroDto: CreateHeroDto) {
    return this.heroService.create(createHeroDto);
  }

  @Patch(':id')
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateHeroDto: UpdateHeroDto) {
    return this.heroService.update(id, updateHeroDto);
  }

  /**
  @Public() // 2. 전역 JWT 가드를 우회
  @Post('seed') // 3. POST /hero/seed 엔드포인트
  @HttpCode(HttpStatus.OK)
  async seedHeroes() {
    return this.heroService.seedHeroes();
  }
 */
}
