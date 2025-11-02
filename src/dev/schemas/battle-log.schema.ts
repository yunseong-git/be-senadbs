import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';
import { Hero } from './hero.schema';
import { BattleEvaluation } from '../common/enums/battle-log.enum';

@Schema({ _id: false })
class SkillReservation {
  @Prop({ required: true })
  heroIndex: number; // 덱(heroes)의 인덱스 (0, 1, 2)

  @Prop({ required: true })
  skillIndex: number; // 해당 영웅(Hero)의 skills 배열 인덱스 (0, 1, 2...)
}

@Schema({ _id: false })
export class DeckInfo {
  @Prop([{ type: Types.ObjectId, ref: 'Hero', required: true }])
  heroes: Hero[]; // 영웅 3명 (ObjectId 배열). populate 후 Hero[] 타입이 됨.

  @Prop({ type: [SkillReservation], default: [] })
  skill_reservation: SkillReservation[]; // [{hero[1], skill[2]} 이렇게 사용가능]
}

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'battle_logs', // Mongoose의 자동복수형(battlelogs) 대신 명시
})
export class BattleLog {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: User; // 작성자

  // 방어덱 정보
  @Prop({ type: DeckInfo })
  defense_deck: DeckInfo;

  // 공격덱 정보
  @Prop({ type: DeckInfo })
  attack_deck: DeckInfo;

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
  upvote_count: number; //추천

  @Prop({ type: Number, default: 0 })
  downvote_count: number; //비추천

  @Prop({ type: Boolean, default: false })
  is_hidden: boolean; // 비추천 비율이 높아 숨김 처리 여부

  @Prop({ type: Boolean, default: false })
  is_deleted: boolean; // Soft delete 용
}

export type BattleLogDocument = HydratedDocument<BattleLog>;
export const BattleLogSchema = SchemaFactory.createForClass(BattleLog);

// index 목록

// 1. "내가 쓴 로그" 검색용
BattleLogSchema.index({ user_id: 1, is_deleted: 1 });

// 2. "방어덱 영웅" 검색용 (핵심 기능)
// 'defense_deck.heroes' 배열에 특정 영웅ID가 포함되어 있는지 검색
BattleLogSchema.index({ "defense_deck.heroes": 1, is_deleted: 1 });

// 3. "추천순" 정렬용
BattleLogSchema.index({ upvote_count: -1, is_deleted: 1 });

// 4. "최신순" 정렬용
BattleLogSchema.index({ created_at: -1, is_deleted: 1 });
