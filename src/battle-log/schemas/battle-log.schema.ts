import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Query, Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Hero } from 'src/hero/schemas/hero.schema';
import { BattleEvaluation } from './battle-log.enum';
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

// pre-hook list

// 1. isDeleted 조회
BattleLogSchema.pre(/^find/, function (this: Query<BattleLogDocument, BattleLogDocument>, next) {
  if (this.getFilter().isDeleted == null) {
    this.where({ isDeleted: false });
  }
  next();
},
);

// index list

// 1. "내가 쓴 로그" 검색용
BattleLogSchema.index({ userId: 1, isDeleted: 1 });

// 3. "추천순" 정렬용
BattleLogSchema.index({
  "defenseDeck.heroes": 1, // 1순위: 방어덱 필터
  upvoteCount: -1,       // 2순위: 추천순 정렬
  isDeleted: 1,
});

// 4. "최신순" 정렬용
BattleLogSchema.index({
  "defenseDeck.heroes": 1, // 1순위: 방어덱 필터
  createdAt: -1,         // 2순위: 최신순 정렬
  isDeleted: 1,
});

// 5. 공격덱 기준 
BattleLogSchema.index({
  "defenseDeck.heroes": 1,
  "attackDeck.heroes": 1,
  result: 1, // 승/패 결과
  isDeleted: 1,
});
