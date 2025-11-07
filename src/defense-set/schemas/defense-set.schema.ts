import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Query, Types } from 'mongoose';
import { DeckInfo } from 'src/common/schemas/deck-info.schema';
import { User } from '../../user/schemas/user.schema';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class DefenseSet {
  @Prop({ type: Number, required: true })
  version: number; //버전

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId; // 작성자

  // 방어덱 정보
  @Prop({ type: DeckInfo })
  deck: DeckInfo;

  @Prop({ type: String, enum: ['속공우선', '내실'], required: true })
  setting: string; //방어덱 세팅 정보

  @Prop({ type: String, maxlength: 500 })
  review?: string; // 코멘트 (선택)

  @Prop({ type: Number, default: 0 })
  upvoteCount: number; //추천

  @Prop({ type: Number, default: 0 })
  downvoteCount: number; //비추천

  @Prop({ type: Number, default: 0 })
  commentCount: number; //비추천

  @Prop({ type: Boolean, default: false })
  isHidden: boolean; // 비추천 비율이 높아 숨김 처리 여부

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean; // Soft delete 용
}

export type DefenseSetDocument = HydratedDocument<DefenseSet>;
export const DefenseSetSchema = SchemaFactory.createForClass(DefenseSet);

/*******pre-hook middleware*******/

DefenseSetSchema.pre(/^find/, //find 계열 모든 쿼리
  function (this: Query<DefenseSetDocument, DefenseSetDocument>, next) { //this가 쿼리객체임을 명시
    if (this.getFilter().isDeleted == null) { this.where({ isDeleted: false }) }
    next();
  });

/*******index*******/

// 1. "내가 쓴 로그" 검색용
DefenseSetSchema.index({ userId: 1, isDeleted: 1 });

// 2. "추천순" 정렬용
DefenseSetSchema.index({ upvoteCount: -1, isDeleted: 1 });

// 3. "최신순" 정렬용
DefenseSetSchema.index({ createdAt: -1, isDeleted: 1 });
