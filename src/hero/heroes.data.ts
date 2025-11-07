import { Hero } from "./schemas/hero.schema";
import { SkillType } from "src/common/enums/hero.enum";

export const HeroesData = [
  {
    name: '루디',
    type: '방어형',
    rank: '찐스',
    skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(버프많은단일) 1타, 기절, 3턴감',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(아군전체) 3턴링크, 디벞1개해제, cc면역',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(아군전체) 상시방증\n(자신) 상시감쇄',
      },
    ],
  },
  {
    name: "아일린",
    type: '만능형',
    rank: '찐스',
    skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(단일) 관통3타, 감전',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 감전',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 감전시 추딜',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(아군전체) 상시물공증\n(자신) 부활',
      },
    ]
  },
  {
    name: "레이첼",
    type: '만능형',
    rank: '찐스',
    skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(3인) 2타, 모공감, 피감, 화상',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(3인) 1타, 방깎, 물취',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(아군전체) 상시약확증\n(자신) 부활.',
      },
    ]
  },
  {
    name: "델론즈",
    type: '공격형',
    rank: '찐스',
    skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 침묵',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(단일) 5타, 처치연속발동',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 침묵',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(아군전체) 상시물피증\n(자신) 4무효화, 아군 사망시 물공증, 무효화 리필',
      },
    ]
  },
  {
    name: "스파이크", type: '만능형', rank: '찐스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(단일) 1타, 빙결\n(같은열적군) 1타, 빙결\n(자신) 힐',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 2타, 빙결\n(자신) 힐',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타\n(아군1명) 2회 발동 시 디벞1개해제',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(아군전체) 상시효저증\n(자신) 회복권능, 상시효적증, 체력 비례 공증',
      },
    ]
  },
  {
    name: "제이브", type: '만능형', rank: '찐스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "크리스", type: '만능형', rank: '찐스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "바네사", type: '마법형', rank: '찐스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "파이", type: '공격형', rank: '초스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "로지", type: '만능형', rank: '초스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "쥬리", type: '마법형', rank: '초스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "멜키르", type: '마법형', rank: '찐스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "콜트", type: '공격형', rank: '찐스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "플라튼", type: '방어형', rank: '찐스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "에이스", type: '만능형', rank: '찐스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "린", type: '마법형', rank: '찐스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "태오", type: '공격형', rank: '찐스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "연희", type: '마법형', rank: '찐스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "카르마", type: '만능형', rank: '찐스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "카일", type: '공격형', rank: '찐스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "타카", type: '공격형', rank: '찐스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "오를리", type: '지원형', rank: '찐스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "아킬라", type: '방어형', rank: '찐스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "클라한", type: '공격형', rank: '찐스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "카구라", type: '공격형', rank: '찐스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "미호", type: '마법형', rank: '짭스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "아멜리아", type: '공격형', rank: '짭스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "키리엘", type: '마법형', rank: '찐스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "에반", type: '방어형', rank: '희귀', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "카린", type: '지원형', rank: '희귀', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "유리", type: '마법형', rank: '희귀', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "리", type: '방어형', rank: '희귀', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "유이", type: '지원형', rank: '희귀', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "아리엘", type: '마법형', rank: '희귀', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "쥬피", type: '공격형', rank: '희귀', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "스니퍼", type: '공격형', rank: '희귀', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "헬레니아", type: '방어형', rank: '희귀', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "헤브니아", type: '공격형', rank: '희귀', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "카론", type: '지원형', rank: '희귀', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "빅토리아", type: '만능형', rank: '희귀', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "루시", type: '지원형', rank: '희귀', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "벨리카", type: '마법형', rank: '짭스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "실비아", type: '마법형', rank: '희귀', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "조커", type: '마법형', rank: '희귀', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "룩", type: '방어형', rank: '짭스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "챈슬러", type: '만능형', rank: '짭스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "메이", type: '공격형', rank: '희귀', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "엘리스", type: '지원형', rank: '짭스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "아라곤", type: '방어형', rank: '짭스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "노호", type: '마법형', rank: '희귀', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "클로에", type: '지원형', rank: '희귀', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "비스킷", type: '방어형', rank: '찐스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "루리", type: '마법형', rank: '짭스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "니아", type: '만능형', rank: '짭스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "에스파다", type: '마법형', rank: '짭스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "세인", type: '공격형', rank: '짭스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "지크", type: '만능형', rank: '짭스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "제인", type: '공격형', rank: '희귀', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "블랙로즈", type: '공격형', rank: '희귀', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "세라", type: '마법형', rank: '희귀', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "발리스타", type: '공격형', rank: '짭스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  },
  {
    name: "실베스타", type: '마법형', rank: '찐스', skills: [
      {
        skillIndex: SkillType.SKILL_1,
        description: '(5인) 1타, 기절, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.SKILL_2,
        description: '(5인) 관통2타, 화상, 대상수 비례 뎀증',
      },
      {
        skillIndex: SkillType.ATTACK,
        description: '(단일) 1타, 화상',
      },
      {
        skillIndex: SkillType.PASSIVE,
        description: '(자신) 반격, 3턴cc면역, 공격력 비례 방증',
      },
    ]
  }
]