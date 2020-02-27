import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PositionsController } from './positions.controller';
import { PositionsService } from './positions.service';
import { CountMiddleware } from './common.middleware';

@Module({
  imports: [],
  controllers: [AppController, PositionsController],
  providers: [AppService, PositionsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CountMiddleware)
      .forRoutes('positions');
  }
}
