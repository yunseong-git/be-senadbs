import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  collection: 'heroesMatchStats',
})
export class HeroesMatchStat {
  // 1. 방어덱 (정렬된 영웅 ID 배열)
  @Prop({ type: [Types.ObjectId], required: true, index: true })
  defenseDeckHeroes: Types.ObjectId[];

  // 2. 공격덱 (정렬된 영웅 ID 배열)
  @Prop({ type: [Types.ObjectId], required: true, index: true })
  attackDeckHeroes: Types.ObjectId[];

  // 3. 총 전적 (몇 번 싸웠나)
  @Prop({ type: Number, default: 0 })
  matchCount: number;

  // 5. 추천/비추천 총합 (신뢰도)
  @Prop({ type: Number, default: 0 })
  totalUpvotes: number;

  @Prop({ type: Number, default: 0 })
  totalDownvotes: number;

  // 6. 평가(evaluation) 점수 총합 (평균 계산용)
  @Prop({ type: Number, default: 0 })
  totalEvaluationScore: number;
}

export type HeroesMatchStatDocument = HydratedDocument<HeroesMatchStat>;
export const HeroesMatchStatSchema = SchemaFactory.createForClass(HeroesMatchStat);

// ... (SchemaFactory.createForClass 등) ...

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  collection: 'skillsMatchStats',
})
export class SkillsMatchStat {

}
