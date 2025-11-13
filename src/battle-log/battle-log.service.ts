import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { BattleLog, BattleLogDocument } from './schemas/battle-log.schema';
import { CreateBattleLogBatchDto } from './dto/create-battle-log.dto';
import { StatsService } from 'src/stats/services/stats.service';
import { BattleEvaluation, BattleResult } from './schemas/battle-log.enum';
import { DeckInfoDto } from './dto/create-battle-log.dto';
import { QueryBattleLogDto } from './dto/query-battle-log.dto';

@Injectable()
export class BattleLogService {
  private readonly logger = new Logger(BattleLogService.name); //todo: 나중에 삭제
  constructor(
    @InjectModel(BattleLog.name)
    private readonly battleLogModel: Model<BattleLogDocument>,
    private readonly statsService: StatsService,
  ) { }

  async findByDefenseDeckHeroes(dto: QueryBattleLogDto) {
    const { heroes, page = '1', limit = '20' } = dto;

    // 영웅 차렷
    const sortedHeroIds = heroes.sort().map((id) => new Types.ObjectId(id));

    const filter: FilterQuery<BattleLogDocument> = {
      'defenseDeck.heroes': sortedHeroIds,
    };

    // pagenation
    const nLimit = parseInt(limit, 10);
    const nPage = parseInt(page, 10);
    const skip = (nPage - 1) * nLimit;

    const data = await this.battleLogModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip).limit(nLimit)
      .lean().exec()

    return { data, page: nPage, limit: nLimit };
  }

  /** 신규 배틀로그 생성 */
  async create(dto: CreateBattleLogBatchDto, userId: Types.ObjectId,) {
    const { logs } = dto;

    // --- 공격덱 중복 검증 로직 ---
    const attackDeckHashes = new Set<string>();
    for (const dto of logs) {
      // DTO의 heroes 배열을 복사하여 정렬 (원본 DTO 변경 방지)
      const sortedHeroes = [...dto.attackDeck.heroes].sort();
      // 정렬된 ID 배열을 문자열 키로 만듦
      const hash = sortedHeroes.join(',');

      // Set에 이미 키가 있으면 중복이므로 에러 발생
      if (attackDeckHashes.has(hash)) {
        throw new BadRequestException(
          `Duplicate attack decks are not allowed in a single request. Offending deck: [${sortedHeroes.join(', ')}]`,
        );
      }
      attackDeckHashes.add(hash);
    }
    // --- 중복 검증 끝 ---

    // 문서를 삽입 형태로 가공
    const documentsToInsert = logs.map((dto) => {
      // 덱 정렬 및 스킬 빈 배열 처리
      this._sortDeckInfo(dto.attackDeck);
      this._sortDeckInfo(dto.defenseDeck);

      // evaluation 조건부 기본값
      let finalEvaluation = dto.evaluation;
      if (finalEvaluation == null) {
        finalEvaluation =
          dto.result === BattleResult.WIN
            ? BattleEvaluation.NORMAL_WIN
            : BattleEvaluation.NORMAL_LOSE;
      }

      return {
        ...dto,
        evaluation: finalEvaluation,
        userId: userId,
      };
    });

    const insertedLogs = await this.battleLogModel.create(documentsToInsert);

    // todo: 나중에 삭제, 통계 업데이트 "Fire-and-Forget"
    Promise.allSettled(
      insertedLogs.map((log) =>
        this.statsService.updateStats(log).catch((err) => {
          this.logger.error(
            `Failed to update stats in background for log ${log._id}: ${err}`,
          );
        }),
      ),
    );

    return { count: insertedLogs.length };
  }

  async findMy(userId: Types.ObjectId) {
    const filter = { userId: userId };
    return await this.battleLogModel.find(filter).lean().exec();
  }


  /** (본인) 배틀로그 삭제 (소프트 삭제) */
  async remove(doc: BattleLogDocument): Promise<void> {
    doc.isDeleted = true;
    await doc.save();

    // 통계 업데이트는 "Fire-and-Forget" (비동기 처리)
    // SQS 도입 전까지는 이 방식을 사용
    this.statsService.decrementStats(doc).catch((err) => {
      // (실제 프로덕션에서는 Sentry/Datadog 등 에러 로깅 필요)
      this.logger.error(
        `Failed to DECREMENT stats in background for deleted log ${doc._id}: ${err}`,
      );
    });
  }

  /** 통계 집계를 위해 덱 정보를 정렬 (heroes)*/
  private _sortDeckInfo(deck: DeckInfoDto): void {
    deck.heroes.sort();
    //DTO에서 undefined로 넘어올 경우를 대비해 빈 배열[]로 할당
    if (!deck.skillReservation) { deck.skillReservation = []; }
  }
}