import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';
import { User } from './user.schema';

//유저가 킾한 픽
@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Pick {
  @Prop({ type: Types.ObjectId, required: true })
  target_id: Types.ObjectId; // 대상 (BattleLog 또는 DefenseDeckGuide의 _id)

  @Prop({ type: User, ref: 'User', required: true })
  user_id: User; // 저장한 사용자

  @Prop({ type: String, enum: ['BattleLog', 'DefenseDeckGuide'], required: true })
  target_type: string; // 대상의 모델 이름
}

export type PickDocument = HydratedDocument<Pick>;
export const PickSchema = SchemaFactory.createForClass(Pick);