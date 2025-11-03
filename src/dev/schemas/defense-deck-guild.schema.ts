import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { DeckInfo } from './battle-log.schema';
import { User } from '../../user/schemas/user.schema';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class DefenseDeckGuide {
  @Prop({ type: Number, required: true })
  version: number; //버전

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: User; // 작성자

  // 방어덱 정보
  @Prop({ type: DeckInfo })
  deck: DeckInfo;

  @Prop({ type: String, enum: ['속공우선', '내실'], required: true })
  setting: string; //방어덱 세팅 정보

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

export type DefenseDeckGuideDocument = HydratedDocument<DefenseDeckGuide>;
export const DefenseDeckGuideSchema = SchemaFactory.createForClass(DefenseDeckGuide);

// index 목록

// 1. "내가 쓴 로그" 검색용
DefenseDeckGuideSchema.index({ userId: 1, isDeleted: 1 });

// 2. "추천순" 정렬용
DefenseDeckGuideSchema.index({ upvoteCount: -1, isDeleted: 1 });

// 3. "최신순" 정렬용
DefenseDeckGuideSchema.index({ createdAt: -1, isDeleted: 1 });
