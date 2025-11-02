import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevModule } from './dev/dev.module';

@Module({
  imports: [DevModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
