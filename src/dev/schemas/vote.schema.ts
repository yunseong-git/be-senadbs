import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Vote {
  @Prop({ type: Types.ObjectId, required: true })
  target_id: Types.ObjectId; // 투표 대상 (BattleLog 또는 DefenseDeckGuide의 _id)

  @Prop({ type: User, ref: 'User', required: true })
  user_id: User; // 투표한 사용자

  @Prop({ type: String, enum: ['BattleLog', 'DefenseDeckGuide'], required: true })
  target_type: string; // 투표 대상의 모델 이름

  @Prop({ type: Number, enum: [1, -1], required: true })
  type: number; // 1: 추천, -1: 비추천
}

export type VoteDocument = HydratedDocument<Vote>;
export const VoteSchema = SchemaFactory.createForClass(Vote);

// '한 유저가 한 대상에 대해 중복 투표 방지'를 위한 유니크 인덱스
VoteSchema.index(
  { user_id: 1, target_id: 1, target_type: 1 },
  { unique: true },
);