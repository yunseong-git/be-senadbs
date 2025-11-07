import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, HydratedDocument } from 'mongoose';
/*
@Schema({ _id: false })
export class DailyLimit { //하루 작성제한
  @Prop({ default: 0 })
  count: number;

  @Prop({ default: () => new Date() })
  lastReset: Date;
}
  */

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class User {
  /*
  @Prop({ required: true, unique: true })
  googleId: string; // Google OAuth ID
  */

  @Prop({ required: true, unique: true })
  testId: string; // 테스트용 id(이거로만 로그인)

  @Prop({ required: true, unique: true, minlength: 2, maxlength: 12 })
  nickname: string; // 닉네임 (중복 비허용)

  @Prop({ type: String, enum: ['user', 'admin'], default: 'user' })
  role: string;

  /*
  @Prop({ type: MongooseSchema.Types.Map, of: DailyLimit })
  dailyLimits: {
    combatLog: DailyLimit;
    defenseGuide: DailyLimit;
  };
*/
  @Prop({ type: String, required: false })
  currentHashedRefreshToken?: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);