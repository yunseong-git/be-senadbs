SENADBS project day1 : schemas(ver1)

DATE: 2025-11-02

1. 개요

모바일 게임 ‘세븐나이츠 리버스’의 컨텐츠 ‘길드전’에서 사용되는 덱을 유저간에 공유할 수 있는 웹 서비스 제작

2. 데이터 모델 (Collections)

총 6개의 collection으로 구성(ver.1)

2.1. User

파일: user.schema.ts

목적: 사용자 정보, 역할, 작성 제한 등 계정 데이터를 관리

핵심 필드:

googleId (String, Unique): Google OAuth 인증 ID

nickname (String, Unique): 서비스 내 고유 닉네임

role (String, Enum): 'user' | 'admin'

dailyLimits (Map): combatLog, defenseGuide의 일일 작성 횟수와 마지막 리셋 시간을 관리하는 서브 도큐먼트

2.2. Hero

파일: hero.schema.ts

목적: 게임 내 희귀, 전설 등급의 영웅에 대한 이름, 등급, 간소화된 스킬정보를 관리

핵심 필드:

name (String, Unique): 영웅 이름

skills (Skill): skillIndex, description 등을 포함하는 스킬 객체의 배열 (서브 도큐먼트)

2.3. DeckInfo (공용 서브 스키마)

파일: deck-info.schema.ts

목적: BattleLog와 DefenseDeckGuide에서 공통으로 사용하는 '덱 정보'를 정의. 각 상위 도큐먼트에 임베딩

핵심 필드:

heroes (ObjectId, ref: 'Hero'): 덱을 구성하는 3명(가정)의 영웅 _id 배열.

skillReservation (SkillReservation):
heroIndex와 skillIndex를 사용해 스킬 예약 순서를 저장, 문자열이 아닌 인덱스 기반으로 데이터 무결성 확보

2.4. BattleLog

파일: battle-log.schema.ts

목적: 유저가 기록한 개별 전투 로그를 저장

핵심 필드:

userId (ObjectId, ref: 'User'): 작성자

defenseDeck / attackDeck (DeckInfo): DeckInfo 스키마를 임베딩하여 덱 정보 저장

evaluation (Number, Enum): BattleEvaluation Enum(10, 8, 6...)을 따르는 number 데이터(집계/통계 성능을 위해 문자열 대신 숫자 저장)

upvoteCount / downvoteCount (Number): Vote 컬렉션과 연동되는 카운터

isDeleted (Boolean): Soft Delete(소프트 삭제) 플래그

인덱스:

(userId, isDeleted): "내가 쓴 로그"

("defenseDeck.heroes", isDeleted): "특정 영웅이 포함된 방어덱"

(upvoteCount, isDeleted): "추천순 정렬"

(created_at, isDeleted): "최신순 정렬"

2.5. DefenseDeckGuide

파일: defense-deck-guide.schema.ts

목적: 유저가 작성하는 '방어덱 가이드'를 저장

핵심 필드:

userId (ObjectId, ref: 'User'): 작성자

deck (DeckInfo): DeckInfo 스키마 임베딩

setting (String, Enum): '속공우선' | '내실'

upvoteCount / downvoteCount (Number): 카운터

인덱스: * (userId, isDeleted): "내가 쓴 로그"

(upvoteCount, isDeleted): "추천순 정렬"

(created_at, isDeleted): "최신순 정렬"

2.6. Vote

파일: vote.schema.ts

목적: BattleLog 또는 DefenseDeckGuide에 대한 '추천/비추천' 기록을 관리

핵심 필드:

targetId (ObjectId): BattleLog 또는 DefenseDeckGuide의 _id

targetType (String, Enum): 'BattleLog' | 'DefenseDeckGuide' (다형성 관계)

userId (ObjectId, ref: 'User'): 투표한 유저

type (Number, Enum): 1(추천) 또는 -1(비추천)

인덱스:

(userId, targetId, targetType) - Unique Index: "한 유저가 한 대상에 대해 중복 투표 방지"를 위한 핵심 인덱스

2.7. Pick

파일: pick.schema.ts

목적: 유저가 '스크랩'한 게시물(BattleLog, DefenseDeckGuide)을 관리합니다.

핵심 필드: (Vote와 거의 동일)

targetId (ObjectId)

targetType (String, Enum)

userId (ObjectId, ref: 'User')

인덱스:

(userId, targetId, targetType) - Unique Index: "한 유저가 한 대상에 대해 중복 저장 방지"

3. 핵심 설계 결정사항

네이밍 규칙 (Naming Convention):

모든 스키마와 필드명은 **camelCase**로 통일. (ex: userId, skillReservation)

timestamps 옵션을 통해 created_at, updated_at을 사용

임베딩(Embedding) vs. 참조(Referencing):

임베딩: DeckInfo처럼 부모(BattleLog)와 생명주기를 같이하고 항상 함께 조회되는 데이터는 임베딩하여 DB 조회 횟수(I/O) 감소

참조: User, Hero처럼 여러 곳에서 참조되고 독립적으로 존재하는 마스터 데이터는 ObjectId와 ref를 사용한 참조로 데이터 중복을 방지

다형성 관계 (Polymorphic Association):

Vote와 Pick은 targetId와 targetType 필드를 조합하여, 하나의 컬렉션이 BattleLog와 DefenseDeckGuide 모두를 참조할 수 있도록 설계

데이터 무결성 및 성능:

Vote/Pick의 유니크 인덱스를 통해 DB 레벨에서 중복 데이터를 방지

BattleLog의 evaluation은 문자열이 아닌 숫자로 저장하여 AVG, SUM 등 집계 쿼리 성능을 최적화

SkillReservation은 문자열("플라튼2")이 아닌 인덱스({heroIndex: 0, skillIndex: 1})로 저장하여 데이터 손실(깨짐) 방지

4. TODO

개발 환경 세팅: 각 도메인별 nest resource 설치 및 의존성 주입, 환경변수 설정 및 DB 커넥션 확인

Auth/User domain: 인증/인가용 passport strategy 작성 및 JWT 설정

test를 위해 devId, devPwd(임시) 필드를 만들어 사용(핵심 로직 작성 완료시 ouath로 변경)

우선은 로그인,회원가입,리프레쉬, jwt authgaurd 까지 설정, limit 및 세부 user 동작 등은 차후 개발

client의 user state에 크게 변동사항이 없을 예정으로, 호출마다 DB쿼리가 아닌 jwt를 신뢰하는 방향으로. 

Hero domain: seed.ts 또는 관리자용 컨트롤러를 통해 Hero 데이터를 저장 및 업데이트 구현, 실제 데이터 삽입까지 진행

Defense-deck-guild domain:  단일 문서 작성 및 기본 전체 쿼리까지만 작성

모든 도메인 API 작성시 재사용될 가능성을 고려해 Type, Class 작성 / DTO는 느슨하게라도 처음부터 작성