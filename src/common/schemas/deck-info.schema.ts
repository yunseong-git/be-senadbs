import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Hero } from 'src/hero/schemas/hero.schema';
import { BattleEvaluation } from '../../dev/common/enums/battle-log.enum';

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
