import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BattleLogDocument } from 'src/battle-log/schemas/battle-log.schema';
import { BattleResult } from 'src/battle-log/schemas/battle-log.enum';
import { HeroesMatchStat, HeroesMatchStatDocument } from '../schemas/heroes-match-stats.schema';
import { SkillsMatchStat, SkillsMatchStatDocument } from '../schemas/skills-match-stat.schema';
import * as crypto from 'crypto';


@Injectable()
export class StatsService {
  // Logger 추가 (비동기 작업 에러 추적용)
  private readonly logger = new Logger(StatsService.name);

  constructor(
    @InjectModel(HeroesMatchStat.name) private readonly heroesMatchStatModel: Model<HeroesMatchStatDocument>,
    @InjectModel(SkillsMatchStat.name) private readonly skillsMatchStatModel: Model<SkillsMatchStatDocument>,
  ) { }
  /** BattleLog가 생성된 후 호출되는 메인 통계 업데이트 함수 (비동기) */
  async updateStats(log: BattleLogDocument): Promise<void> {
    try {
      //부모(영웅 덱) 통계부터 upsert
      const parentStatId = await this._updateHeroesMatchStats(log);

      //부모 ID를 자식(스킬 덱) 통계에 전달해서 upsert
      await this._updateSkillsMatchStats(log, parentStatId);

    } catch (error) {
      this.logger.error(`Failed to update stats for log ${log._id}: ${error}`);
    }
  }

  /** 영웅덱 통계 업데이트 (HeroesMatchStat): 부모 문서를 찾아 _id를 반환 */
  private async _updateHeroesMatchStats(log: BattleLogDocument,): Promise<Types.ObjectId> {
    // 영웅 덱 해시 생성
    const heroesHash = this._createHeroesHash(log);
    const filter = { heroesHash: heroesHash };
    const update = {
      $inc: {
        matchCount: 1,
        attackWinCount: log.result === BattleResult.WIN ? 1 : 0,
        totalEvaluationScore: log.evaluation,
      },
      $setOnInsert: {
        heroesHash: heroesHash,
        defenseDeckHeroes: log.defenseDeck.heroes,
        attackDeckHeroes: log.attackDeck.heroes,
      },
    };

    const statDoc = await this.heroesMatchStatModel.findOneAndUpdate(filter, update,
      {
        upsert: true,     // 없으면 생성
        new: true,        // 업데이트된 new 문서를 반환
        select: { _id: 1 }, // (최적화)반환 문서에서 _id 필드만 선택
        lean: true,       // (최적화)lean
      },
    );

    if (!statDoc) {
      this.logger.error(`Failed to upsert and find HeroesMatchStat for hash: ${heroesHash}`);
      throw new Error('Failed to retrieve upserted document ID');
    }

    return statDoc._id;
  }

  /**스킬 매치 통계 업데이트 (SkillsMatchStat)*/
  private async _updateSkillsMatchStats(log: BattleLogDocument, parentStatId: Types.ObjectId): Promise<void> {

    // 스킬 덱 해시 생성 (부모 ID 포함)
    const skillsHash = this._createSkillsHash(log, parentStatId);

    const filter = {
      heroesMatchStatId: parentStatId,
      skillsHash: skillsHash,
    };

    const update = {
      $inc: {
        matchCount: 1,
        attackWinCount: log.result === BattleResult.WIN ? 1 : 0,
        totalEvaluationScore: log.evaluation,
      },
      $setOnInsert: {
        heroesMatchStatId: parentStatId,
        skillsHash: skillsHash,
        defenseDeckSkillReservation: log.defenseDeck.skillReservation,
        attackDeckSkillReservation: log.attackDeck.skillReservation,
      },
    };

    await this.skillsMatchStatModel.updateOne(filter, update, { upsert: true });
  }


  private _createHeroesHash(log: BattleLogDocument): string {
    const keyData = {
      defH: log.defenseDeck.heroes,
      attH: log.attackDeck.heroes,
    };
    const keyString = JSON.stringify(keyData);
    return crypto.createHash('md5').update(keyString).digest('hex');
  }

  private _createSkillsHash(log: BattleLogDocument, parentStatId: Types.ObjectId,): string {
    const keyData = {
      parentId: parentStatId.toString(),
      defS: log.defenseDeck.skillReservation,
      attS: log.attackDeck.skillReservation,
    };
    const keyString = JSON.stringify(keyData);
    return crypto.createHash('md5').update(keyString).digest('hex');
  }
}