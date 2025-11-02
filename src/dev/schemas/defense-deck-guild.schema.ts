import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { DeckInfo } from './battle-log.schema';
import { User } from './user.schema';

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class DefenseDeckGuide {

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: User; // 작성자

  // 방어덱 정보
  @Prop({ type: DeckInfo })
  deck: DeckInfo;

  @Prop({ type: String, enum: ['속공우선', '내실'], required: true })
  setting: string; //방어덱 세팅 정보

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

export type DefenseDeckGuideDocument = HydratedDocument<DefenseDeckGuide>;
export const DefenseDeckGuideSchema = SchemaFactory.createForClass(DefenseDeckGuide);

// index 목록

// 1. "내가 쓴 로그" 검색용
DefenseDeckGuideSchema.index({ user_id: 1, is_deleted: 1 });

// 2. "추천순" 정렬용
DefenseDeckGuideSchema.index({ upvote_count: -1, is_deleted: 1 });

// 3. "최신순" 정렬용
DefenseDeckGuideSchema.index({ created_at: -1, is_deleted: 1 });
