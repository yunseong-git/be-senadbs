import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, HydratedDocument } from 'mongoose';

@Schema({ _id: false })
class DailyLimit { //하루 작성제한
  @Prop({ default: 0 })
  count: number;

  @Prop({ default: () => new Date() })
  lastReset: Date;
}

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User {
  @Prop({ required: true, unique: true })
  google_id: string; // Google OAuth ID

  @Prop({ required: true, unique: true, minlength: 2, maxlength: 12 })
  nickname: string; // 닉네임 (중복 비허용)

  @Prop({ type: String, enum: ['user', 'admin'], default: 'user' })
  role: string;

  @Prop({ type: MongooseSchema.Types.Map, of: DailyLimit })
  daily_limits: {
    combatLog: DailyLimit;
    defenseGuide: DailyLimit;
  };
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);