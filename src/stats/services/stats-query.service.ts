import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { HeroesMatchStat, HeroesMatchStatDocument } from '../schemas/heroes-match-stats.schema';
import { SkillsMatchStat, SkillsMatchStatDocument, } from '../schemas/skills-match-stat.schema';
import { GetHeroesStatsQueryDto } from '../dto/query-heroes-stats.schema';
import { HeroesStatsResponse, SkillsStatsResponse } from '../types/query-response.type';

@Injectable()
export class StatsQueryService {
  constructor(
    @InjectModel(HeroesMatchStat.name) private readonly heroesMatchStatModel: Model<HeroesMatchStatDocument>,
    @InjectModel(SkillsMatchStat.name) private readonly skillsMatchStatModel: Model<SkillsMatchStatDocument>,
  ) { }

  /**방어덱 영웅들로 매치업 통계 조회*/
  async getHeroesMatchStats(dto: GetHeroesStatsQueryDto): Promise<HeroesStatsResponse[]> {
    // 쿼리를 위해 DTO의 영웅 ID 배열을 정렬
    const sortedHeroIds = dto.heroes.sort().map((id) => new Types.ObjectId(id));

    // 정렬된 덱 ID로 통계 컬렉션 조회
    const filter = {
      defenseDeckHeroes: sortedHeroIds,
    };

    // 승률(attackWinCount)이 높은 순으로 정렬
    const stats = await this.heroesMatchStatModel
      .find(filter)
      .sort({ attackWinCount: -1 })
      .lean()
      .exec();

    // 데이터매핑-> HeroesStatsResponse[]
    return stats.map((stat) => {
      const {
        matchCount,
        attackWinCount,
        totalEvaluationScore,
        upvoteCount,
        downvoteCount,
      } = stat;

      // 0으로 나누기 방지
      const winRate =
        matchCount > 0 ? (attackWinCount / matchCount) * 100 : 0;
      const avgEvaluation =
        matchCount > 0 ? totalEvaluationScore / matchCount : 0;

      // HeroesStatsResponse 타입에 맞게 객체 생성
      return {
        attackDeckHeroes: stat.attackDeckHeroes,
        matchCount,
        winRate: parseFloat(winRate.toFixed(2)),
        avgEvaluation: parseFloat(avgEvaluation.toFixed(2)),
        upvoteCount: upvoteCount,
        downvoteCount: downvoteCount,
      };
    });
  }

  /** 덱 vs 덱 기반으로 스킬 통계 조회*/
  async getSkillsMatchStats(heroesMatchStatId: string): Promise<SkillsStatsResponse[]> {
    const filter = {
      heroesMatchStatId: new Types.ObjectId(heroesMatchStatId),
    };

    // 승률(attackWinCount)이 높은 순으로 정렬
    const stats = await this.skillsMatchStatModel
      .find(filter)
      .sort({ attackWinCount: -1 })
      .lean()
      .exec();

    // 데이터매핑 -> SkillsStatsResponse[]
    return stats.map((stat) => {
      const {
        matchCount,
        attackWinCount,
        totalEvaluationScore,
        upvoteCount,
        downvoteCount,
      } = stat;

      const winRate =
        matchCount > 0 ? (attackWinCount / matchCount) * 100 : 0;
      const avgEvaluation =
        matchCount > 0 ? totalEvaluationScore / matchCount : 0;

      // SkillsStatsResponse 타입에 맞게 객체 생성
      return {
        defenseDeckSkillReservation: stat.defenseDeckSkillReservation,
        attackDeckSkillReservation: stat.attackDeckSkillReservation,
        matchCount,
        winRate: parseFloat(winRate.toFixed(2)),
        avgEvaluation: parseFloat(avgEvaluation.toFixed(2)),
        upvoteCount: upvoteCount,
        downvoteCount: downvoteCount,
      };
    });
  }

}