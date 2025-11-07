import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { HeroService } from './hero.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {
  }

  @Public() // 2. 전역 JWT 가드를 우회
  @Post('seed') // 3. POST /hero/seed 엔드포인트
  @HttpCode(HttpStatus.OK)
  async seedHeroes() {
    return this.heroService.seedHeroes();
  }
}
