import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      /**
       * transform: true
       * 컨트롤러가 받은 데이터를 DTO 클래스 인스턴스로 자동 변환합니다.
       * (예: query의 "1" (string) -> 1 (number))
       */
      transform: true,

      /**
       * whitelist: true
       * DTO에 정의되지 않은 속성(필드)이 요청에 포함되면,
       * 해당 속성을 자동으로 제거하고 DTO만 받습니다.
       * (보안상 권장됩니다.)
       */
      whitelist: true,

      /**
       * forbidNonWhitelisted: true (선택 사항)
       * DTO에 정의되지 않은 속성이 넘어오면,
       * 400 Bad Request 에러를 발생시킵니다. (whitelist보다 엄격함)
       */
      // forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
