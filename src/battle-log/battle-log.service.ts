import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BattleLog, BattleLogDocument } from './schemas/battle-log.schema';
import { CreateBattleLogDto } from './dto/create-battle-log.dto';
import { StatsService } from 'src/stats/services/stats.service';
import { BattleEvaluation, BattleResult } from './schemas/battle-log.enum';
import { DeckInfoDto } from './dto/create-battle-log.dto';

@Injectable()
export class BattleLogService {
  constructor(
    @InjectModel(BattleLog.name)
    private readonly battleLogModel: Model<BattleLogDocument>,
    private readonly statsService: StatsService,
  ) { }

  /**
   * 신규 배틀로그 1건 생성
   */
  async create(dto: CreateBattleLogDto, userId: Types.ObjectId,): Promise<BattleLogDocument> {

    // 덱 정보 정렬 (통계 집계를 위해)
    this._sortDeckInfo(dto.attackDeck);
    this._sortDeckInfo(dto.defenseDeck);

    // 2. evaluation 조건부 기본값 처리
    let finalEvaluation = dto.evaluation;
    if (finalEvaluation == null) {
      finalEvaluation =
        dto.result === BattleResult.WIN
          ? BattleEvaluation.NORMAL_WIN
          : BattleEvaluation.NORMAL_LOSE;
    }

    // 3. 로그 생성
    const newLog = new this.battleLogModel({
      ...dto,
      evaluation: finalEvaluation,
      userId: userId,
      // speed는 DTO에 없으면 스키마의 default(1)가 적용됨
    });

    const savedLog = await newLog.save();

    // 4. [중요] 통계 업데이트는 "Fire-and-Forget" (비동기 처리)
    // SQS 도입 전까지는 이 방식을 사용
    this.statsService.updateStats(savedLog).catch((err) => {
      // (실제 프로덕션에서는 Sentry/Datadog 등 에러 로깅 필요)
      console.error('Failed to update stats in background:', err);
    });

    return savedLog; // 5. 클라이언트에게는 저장된 로그 즉시 반환
  }

  /**
   * (개발용) 배틀로그 대량 생성
   */
  async createBulk(
    dtos: CreateBattleLogDto[],
    userId: Types.ObjectId,
  ): Promise<{ count: number }> {
    const documentsToInsert = dtos.map((dto) => {

      if (!dto.attackDeck.skillReservation) {
        dto.attackDeck.skillReservation = [];
      }
      if (!dto.defenseDeck.skillReservation) {
        dto.defenseDeck.skillReservation = [];
      }
      // 덱 정렬
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

    // 3. 몽고DB에 대량 삽입
    const insertedLogs = await this.battleLogModel.create(documentsToInsert);

    // 4. (동일) 모든 로그에 대해 통계 업데이트 비동기 실행
    // (Promise.allSettled를 써서 하나가 실패해도 나머지는 실행되게 함)
    Promise.allSettled(
      insertedLogs.map((log) =>
        this.statsService.updateStats(log).catch((err) => {
          console.error('Failed to update stats in background (bulk):', err);
        }),
      ),
    );

    return { count: insertedLogs.length };
  }

  /** 통계 집계를 위해 덱 정보를 정렬 (heroes)*/
  private _sortDeckInfo(deck: DeckInfoDto): void {
    deck.heroes.sort();
    //DTO에서 undefined로 넘어올 경우를 대비해 빈 배열[]로 할당
    if (!deck.skillReservation) { deck.skillReservation = []; }
  }

}