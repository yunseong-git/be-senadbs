import { Types } from "mongoose";
import { SkillReservation } from "src/battle-log/schemas/deck-info.schema";

export type SkillsStatsResponse = {
  //대상정보
  defenseDeckSkillReservation: SkillReservation[];
  attackDeckSkillReservation: SkillReservation[];
  //상세정보
  matchCount: number;
  winRate: number;
  avgEvaluation: number;
  buffCount: number;
  nurfCount: number;
}

export type HeroesStatsResponse = {
  //대상정보
  attackDeckHeroes: Types.ObjectId[];
  //상세정보
  matchCount: number;
  winRate: number;
  avgEvaluation: number;
  buffCount: number;
  nurfCount: number;
}