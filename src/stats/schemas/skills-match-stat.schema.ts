import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
// BattleLog가 사용하는 DeckInfo의 SkillReservation 스키마를 가져옵니다.
import {
  SkillReservation,
  SkillReservationSchema,
} from '../../common/schemas/deck-info.schema';

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  collection: 'skillsMatchStats',
})
export class SkillsMatchStat {
  // 1. 방어덱 영웅
  @Prop({ type: [Types.ObjectId], required: true, index: true })
  defenseDeckHeroes: Types.ObjectId[];

  // 2. 공격덱 영웅
  @Prop({ type: [Types.ObjectId], required: true, index: true })
  attackDeckHeroes: Types.ObjectId[];

  // 3. 방어덱 스킬 예약
  @Prop({ type: [SkillReservationSchema], required: true, default: [] })
  defenseDeckSkillReservation: SkillReservation[];

  // 4. 공격덱 스킬 예약
  @Prop({ type: [SkillReservationSchema], required: true, default: [] })
  attackDeckSkillReservation: SkillReservation[];

  @Prop({ type: Number, default: 0 })
  matchCount: number;

  // 5. [추가] "승률" 계산을 위해 공격덱 기준 승리 횟수 추가
  @Prop({ type: Number, default: 0 })
  attackWinCount: number;

  @Prop({ type: Number, default: 0 })
  totalUpvotes: number;

  @Prop({ type: Number, default: 0 })
  totalDownvotes: number;

  @Prop({ type: Number, default: 0 })
  totalEvaluationScore: number;
}

export type SkillsMatchStatDocument = HydratedDocument<SkillsMatchStat>;
export const SkillsMatchStatSchema =
  SchemaFactory.createForClass(SkillsMatchStat);

// 6. 스킬 예약까지 포함하여 인덱스 생성 (시나리오 3번용)
SkillsMatchStatSchema.index({
  defenseDeckHeroes: 1,
  defenseDeckSkillReservation: 1,
});