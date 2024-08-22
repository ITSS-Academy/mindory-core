import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardService } from './card/card.service';
import { CardController } from './card/card.controller';
import { CardModule } from './card/card.module';
import { FlashcardService } from './flashcard/flashcard.service';
import { FlashcardModule } from './flashcard/flashcard.module';
import { FolderController } from './folder/folder.controller';
import { FolderModule } from './folder/folder.module';
import { ProfileService } from './profile/profile.service';
import { ProfileModule } from './profile/profile.module';
import { SubjectsController } from './subjects/subjects.controller';
import { SubjectsModule } from './subjects/subjects.module';
import { SubjectsService } from './subjects/subjects.service';
import { FolderService } from './folder/folder.service';
import { FlashcardController } from './flashcard/flashcard.controller';
import { ProfileController } from './profile/profile.controller';
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
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
