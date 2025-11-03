import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ _id: false }) // 스킬 객체 자체는 ID가 필요 없음
export class Skill {
  @Prop({ required: true })
  skillName: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  cooldown?: number; // 쿨타임 (선택)
}

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Hero {
  @Prop({ required: true, unique: true })
  name: string; // 영웅 이름 (예: 루디)

  @Prop({ required: true, index: true })
  rank: string; // 등급 (예: 전설)

  @Prop({ required: true, index: true })
  type: string; // 유형 (예: 방어형, 공격형)

  //스킬 배열: 문자열이 아닌 Skill 객체의 배열
  @Prop({ type: [Skill] })
  skills: Skill[];
}

export type HeroDocument = HydratedDocument<Hero>;
export const HeroSchema = SchemaFactory.createForClass(Hero);