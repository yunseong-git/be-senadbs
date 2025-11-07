import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hero, HeroDocument } from './schemas/hero.schema';
import { HeroesData } from './heroes.data';

@Injectable()
export class HeroService {
  constructor(@InjectModel(Hero.name) private heroModel: Model<HeroDocument>) { }
  async seedHeroes(): Promise<{ message: string; count: number }> {
    try {
      // 1. 기존 데이터 모두 삭제 (중복 방지)
      await this.heroModel.deleteMany({});

      // 2. 데이터 파일 기준으로 새로 삽입
      const result = await this.heroModel.insertMany(HeroesData);

      return {
        message: 'Hero data seeded successfully.',
        count: result.length,
      };
    } catch (error) {
      console.error('Failed to seed heroes:', error);
      throw new InternalServerErrorException('Failed to seed hero data.');
    }
  }
}
