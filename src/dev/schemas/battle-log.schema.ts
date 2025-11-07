import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Hero } from 'src/hero/schemas/hero.schema';
import { BattleEvaluation } from '../common/enums/battle-log.enum';
import { DeckInfo } from '../../common/schemas/deck-info.schema';

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  collection: 'battlelogs', // Mongoose의 자동복수형(battlelogs) 대신 명시
})
export class BattleLog {
  @Prop({ type: Number, required: true })
  version: number; //버전

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: User; // 작성자

  // 방어덱 정보
  @Prop({ type: DeckInfo })
  defenseDeck: DeckInfo;

  // 공격덱 정보
  @Prop({ type: DeckInfo })
  attackDeck: DeckInfo;

  @Prop({ type: String, enum: ['선속공', '후속공'], required: true })
  speed: string; // 선속공 | 후속공

  @Prop({ type: String, enum: ['승리', '패배'], required: true })
  result: string; // 전투 결과

  @Prop({
    type: Number,
    required: true,
    enum: Object.values(BattleEvaluation).filter(
      (v) => typeof v === 'number',
    ),
  })
  evaluation: BattleEvaluation; //전투 평가

  @Prop({ type: String, maxlength: 500 })
  comment?: string; // 코멘트 (선택)

  @Prop({ type: Number, default: 0 })
  upvoteCount: number; //추천

  @Prop({ type: Number, default: 0 })
  downvoteCount: number; //비추천

  @Prop({ type: Boolean, default: false })
  isHidden: boolean; // 비추천 비율이 높아 숨김 처리 여부

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean; // Soft delete 용
}

export type BattleLogDocument = HydratedDocument<BattleLog>;
export const BattleLogSchema = SchemaFactory.createForClass(BattleLog);

// index 목록

// 1. "내가 쓴 로그" 검색용
BattleLogSchema.index({ userId: 1, isDeleted: 1 });

// 2. "방어덱 영웅" 검색용 (핵심 기능)
// 'defense_deck.heroes' 배열에 특정 영웅ID가 포함되어 있는지 검색
BattleLogSchema.index({ "defenseDeck.heroes": 1, isDeleted: 1 });

// 3. "추천순" 정렬용
BattleLogSchema.index({ upvoteCount: -1, isDeleted: 1 });

// 4. "최신순" 정렬용
BattleLogSchema.index({ createdAt: -1, isDeleted: 1 });
