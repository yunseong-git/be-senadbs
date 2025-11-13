import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Query, Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { BattleEvaluation, BattleResult, BattleSpeed } from './battle-log.enum';
import { DeckInfo } from './deck-info.schema';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, collection: 'battlelogs', })
export class BattleLog {
  @Prop({ type: Number, required: true })
  version: number; //버전

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: User; // 작성자

  // 방어덱 정보
  @Prop({ type: DeckInfo, required: true })
  defenseDeck: DeckInfo;

  // 공격덱 정보
  @Prop({ type: DeckInfo, required: true })
  attackDeck: DeckInfo;

  //선속공 정보
  @Prop({
    type: Number,
    enum: Object.values(BattleSpeed).filter((v) => typeof v === 'number'),
    required: true,
    default: BattleSpeed.FIRST_STRIKE,
  })
  speed: BattleSpeed;

  //승리 여부
  @Prop({
    type: Number,
    enum: Object.values(BattleResult).filter((v) => typeof v === 'number'),
    required: true,
  })
  result: BattleResult;

  //전투 평가
  @Prop({
    type: Number,
    enum: Object.values(BattleEvaluation).filter((v) => typeof v === 'number'),
    required: true,
  })
  evaluation: BattleEvaluation;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean; // Soft delete 용

  @Prop({ type: Number, required: true })
  reportCount: number;
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

// 2. 방어덱 별 "최신순" 정렬용
BattleLogSchema.index({
  "defenseDeck.heroes": 1, // 1순위: 방어덱 필터
  createdAt: -1,         // 2순위: 최신순 정렬
  isDeleted: 1,
});
