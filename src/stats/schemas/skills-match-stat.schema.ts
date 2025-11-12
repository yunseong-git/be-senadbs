import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
// BattleLog가 사용하는 DeckInfo의 SkillReservation 스키마를 가져옵니다.
import { SkillReservation, SkillReservationSchema, } from '../../battle-log/schemas/deck-info.schema';

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  collection: 'skillsMatchStats',
})
export class SkillsMatchStat {
  @Prop({ type: Types.ObjectId, ref: 'HeroesMatchStat', required: true })
  heroesMatchStatId: Types.ObjectId;

  // 스킬 조합 해시 (Unique Index) : heroesMatchStatId + defSkills + attSkills의 해시
  @Prop({ type: String, required: true })
  skillsHash: string;

  // 방어덱 스킬 예약
  @Prop({ type: [SkillReservationSchema], required: true, default: [] })
  defenseDeckSkillReservation: SkillReservation[];

  // 공격덱 스킬 예약
  @Prop({ type: [SkillReservationSchema], required: true, default: [] })
  attackDeckSkillReservation: SkillReservation[];

  @Prop({ type: Number, default: 0 })
  matchCount: number;

  // 5. [추가] "승률" 계산을 위해 공격덱 기준 승리 횟수 추가
  @Prop({ type: Number, default: 0 })
  attackWinCount: number;

  @Prop({ type: Number, default: 0 })
  upvoteCount: number;

  @Prop({ type: Number, default: 0 })
  downvoteCount: number;

  @Prop({ type: Number, default: 0 })
  totalEvaluationScore: number;
}

export type SkillsMatchStatDocument = HydratedDocument<SkillsMatchStat>;
export const SkillsMatchStatSchema = SchemaFactory.createForClass(SkillsMatchStat);

// index 1: for query
SkillsMatchStatSchema.index({ heroesMatchStatId: 1, attackWinCount: -1, });

//index 2: for upsert
SkillsMatchStatSchema.index({ heroesMatchStatId: 1, skillsHash: 1 }, { unique: true });