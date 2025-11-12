import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ _id: false })
export class SkillReservation {
  @Prop({ type: Types.ObjectId, ref: 'Hero', required: true })
  heroId: Types.ObjectId;

  @Prop({ required: true })
  skillIndex: number; // 해당 영웅(Hero)의 skills 배열 인덱스 (0, 1, 2...)
}

export const SkillReservationSchema = SchemaFactory.createForClass(SkillReservation);

@Schema({ _id: false })
export class DeckInfo {
  @Prop([{ type: Types.ObjectId, ref: 'Hero', required: true }])
  heroes: Types.ObjectId[]; // 영웅 3명 (ObjectId 배열). populate 후 Hero[] 타입이 됨.

  @Prop({ type: [SkillReservation], default: [] })
  skillReservation: SkillReservation[]; // [{hero[1], skill[2]} 이렇게 사용가능]
}
