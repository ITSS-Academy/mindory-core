import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardService } from './card/card.service';
import { CardController } from './card/card.controller';
import { CardModule } from './card/card.module';
import { FlashcardModule } from './flashcard/flashcard.module';
import { FolderModule } from './folder/folder.module';
import { ProfileModule } from './profile/profile.module';
import { SubjectsModule } from './subjects/subjects.module';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [
    CardModule,
    FlashcardModule,
    FolderModule,
    ProfileModule,
    SubjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'subject', method: RequestMethod.ALL },
        { path: 'subject/:id', method: RequestMethod.ALL },
        { path: 'flashcard/subject', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
