import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { HeroService } from '../hero.service';
import { Public } from 'src/common/decorators/public.decorator';

@Public()
@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {
  }
  @Get()
  async findAll() {
    return await this.heroService.findAll();
  }
}
