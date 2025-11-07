# SENADBS project day2 : User(Auth)Domain (ver1), HeroDomain (ver1) & seeding 

DATE: 2025-11-03

## 1. 목표

* 개발 환경 세팅: 각 도메인별 nest resource 설치 및 의존성 주입, 환경변수 설정 및 DB 커넥션 확인

* `Auth/User domain`: 인증/인가용 passport strategy 작성 및 JWT 설정

  * test를 위해 devId, devPwd(임시) 필드를 만들어 사용(핵심 로직 작성 완료시 ouath로 변경)

  * 우선은 로그인,회원가입,리프레쉬, jwt authgaurd 까지 설정, limit 및 세부 user 동작 등은 차후 개발

  * client의 user state에 크게 변동사항이 없을 예정으로, 호출마다 DB쿼리가 아닌 jwt를 신뢰하는 방향으로. 

* `Hero domain`: seed.ts 또는 관리자용 컨트롤러를 통해 Hero 데이터를 저장 및 업데이트 구현, 실제 데이터 삽입까지 진행

* `Defense-deck-guide domain`:  단일 문서 작성 및 기본 전체 쿼리까지만 작성

* 모든 도메인 API 작성시 재사용될 가능성을 고려해 Type, Class 작성 / DTO는 느슨하게라도 처음부터 작성

## 2. 공통

* `Schemas(ver2)`:  네이밍 컨벤션 안맞는 부분 수정, battlelog와 defensedeckguide에 version필드 추가 

## 3. User

## 4. Hero

## 5. Defense-set