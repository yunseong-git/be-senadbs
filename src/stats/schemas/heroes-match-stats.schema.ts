import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  collection: 'heroesMatchStats',
})
export class HeroesMatchStat {
  // unique key(for upsert)
  @Prop({ type: String, required: true, unique: true })
  heroesHash: string;

  // 방어덱영웅 (정렬필수)
  @Prop({ type: [Types.ObjectId], required: true })
  defenseDeckHeroes: Types.ObjectId[];

  // 공격덱영웅 (정렬필수)
  @Prop({ type: [Types.ObjectId], required: true })
  attackDeckHeroes: Types.ObjectId[];

  // 총 승리회수 (몇 번 이겼냐)
  @Prop({ type: Number, default: 0 })
  attackWinCount: number;

  // 총 전적 (몇 번 싸웠나)
  @Prop({ type: Number, default: 0 })
  matchCount: number;

  // 추천
  @Prop({ type: Number, default: 0 })
  upvoteCount: number;

  // 비추천
  @Prop({ type: Number, default: 0 })
  downvoteCount: number;

  // 평가(evaluation) 점수 총합 (평균 계산용)
  @Prop({ type: Number, default: 0 })
  totalEvaluationScore: number;
}

export type HeroesMatchStatDocument = HydratedDocument<HeroesMatchStat>;
export const HeroesMatchStatSchema = SchemaFactory.createForClass(HeroesMatchStat);

//index 1: 승리 회수 높은 순으로 기본검색
HeroesMatchStatSchema.index({ defenseDeckHeroes: 1, attackWinCount: -1 });
