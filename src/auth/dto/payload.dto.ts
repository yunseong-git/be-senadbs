import { Types } from "mongoose";

/**기본 jwt accessToken payload */
export type JwtPayload = {
  sub: string;
  nickname: string;
  role: string;
  //나중에 limit 추가? 정책 고려해봐야할듯...
}

/**refreshToken용 가벼운 payload */
export type RefreshTokenPayload = {
  sub: string;
}

/**strategy 통과 후 내부로직에 사용할 payload */
export class UserPayload {
  userId: Types.ObjectId;
  nickname: string;
  role: string;
  //나중에 limit 추가? 
}
