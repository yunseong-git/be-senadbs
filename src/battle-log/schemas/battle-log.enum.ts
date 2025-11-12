export enum BattleEvaluation {
  EASY = 10, //쉬움
  SAFELY = 9, //무난
  NORMAL_WIN = 7, //(미입력) 승리시
  LUCKY_WIN = 6, //운빨로 승리
  CLOSE_CALL = 5, //아슬아슬 이김
  UNFAIR = 4, //억까 당함
  NORMAL_LOSE = 2, //(미입력) 패배시
  IMPOSSIBLE = 1, //어림없음
}

export enum BattleResult {
  WIN = 1, //승리
  LOSE = 0, //패배
}

export enum BattleSpeed {
  FIRST_STRIKE = 1,  //선속공
  SECOND_STRIKE = 0, //후속공
}